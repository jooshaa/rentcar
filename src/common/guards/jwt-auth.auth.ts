// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { Observable } from "rxjs";

// @Injectable()
// export class JwtAuthGuard implements CanActivate {

//     constructor( private readonly jwtService: JwtService){}

//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     console.log(request);

//     const authHeader = request.headers["authorization"];
//     if (!authHeader) {
//       throw new UnauthorizedException("Authorization header not found");
//     }


    
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//         throw new UnauthorizedException("Token not found")
//     }
//     let decodedToken: any;
//     try{
//       decodedToken = this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })
        
//     }catch(error){
//         throw new UnauthorizedException({
//             message: "User unauthorized.",
//             error,
//         })
//     }
//     request.user = decodedToken;
//     return true;
//   }
// }
// src/guards/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    // 1) если маршрут помечен @Public() — пропускаем
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // 2) стандартная авторизация по заголовку Authorization
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const token = parts[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('User unauthorized');
    }
  }
}