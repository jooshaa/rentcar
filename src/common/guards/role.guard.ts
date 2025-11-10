// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   UnauthorizedException,
// } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { JwtService } from "@nestjs/jwt";
// import { Observable } from "rxjs";
// import { ROLES_KEY } from "../../app.constants";
// import { error } from "console";

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();

//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()]
//     );

//     if (!requiredRoles) {
//       return true;
//     }

    
//     const permission = request.user.roles.some((role: any) =>
//       requiredRoles.includes(role.value)
//     );

//     if(!permission){
//         throw new ForbiddenException({
//           message: "Unauthorized role",
//         });
//     }

    
//     return true;
//   }
// }
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../app.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    // Получаем метаданные (список required roles) — может вернуть undefined
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Если роли не заданы на маршруте — разрешаем доступ
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Убедимся, что пользователь аутентифицирован и req.user есть
    const user = req.user;
    if (!user) {
      // Можно также вернуть false, но лучше понятное исключение
      throw new UnauthorizedException('User not authenticated');
    }

    // Преобразуем requiredRoles в lower-case для устойчивого сравнения
    const requiredLower = requiredRoles.map((r) => String(r).toLowerCase());

    // Поддерживаем несколько возможных форм хранения ролей в user:
    //  - user.roles = ['admin','user']
    //  - user.roles = [{ value: 'admin' }, { name: 'user' }]
    //  - user.role = 'admin' (одна роль)
    let userRoles: string[] = [];

    if (Array.isArray(user.roles) && user.roles.length > 0) {
      userRoles = user.roles.map((r: any) =>
        String(r?.value ?? r?.name ?? r).toLowerCase(),
      );
    } else if (user.role) {
      userRoles = [String(user.role).toLowerCase()];
    }

    // Защита: если у пользователя нет ролей — deny
    if (!userRoles || userRoles.length === 0) {
      throw new ForbiddenException('User has no roles');
    }

    // Проверяем пересечение: есть ли у пользователя хотя бы одна требуемая роль
    const hasPermission = requiredLower.some((rr) => userRoles.includes(rr));

    if (!hasPermission) {
      throw new ForbiddenException('Unauthorized role');
    }

    return true;
  }
}

