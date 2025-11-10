import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { Admin } from '../admin/entities/admin.entity';
import { CreateClientDto } from '../client/dto/create-client.dto';
import * as bcrypt from "bcrypt";
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { AdminService } from '../admin/admin.service';
import { LoginDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    // @InjectRepository(Client) private readonly clientModel: typeof Client
  ) { }


  private async generateTokensForUsers(user: Client) {
    const payload = { id: user.id, email: user.email, role: "user" };

    const accessSecret = process.env.ACCESS_TOKEN_KEY!;
    const refreshSecret = process.env.REFRESH_TOKEN_KEY!;
    const accessExpiresIn = process.env.ACCESS_TOKEN_TIME!;
    const refreshExpiresIn = process.env.REFRESH_TOKEN_TIME!;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload as Record<string, unknown>, {
        secret: accessSecret,
        expiresIn: accessExpiresIn as unknown as number | string,
      } as any),
      this.jwtService.signAsync(payload as Record<string, unknown>, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn as unknown as number | string,
      } as any),
    ]);

    return { accessToken, refreshToken };
  }



  private async generateTokensForAdmins(user: Admin) {
    const payload = { id: user.id, email: user.email, role: user.role };

    const accessSecret = process.env.ACCESS_TOKEN_KEY!;
    const refreshSecret = process.env.REFRESH_TOKEN_KEY!;
    const accessExpiresIn = process.env.ACCESS_TOKEN_TIME!;
    const refreshExpiresIn = process.env.REFRESH_TOKEN_TIME!;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload as Record<string, unknown>, {
        secret: accessSecret,
        expiresIn: accessExpiresIn as unknown as number | string,
      } as any),
      this.jwtService.signAsync(payload as Record<string, unknown>, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn as unknown as number | string,
      } as any),
    ]);

    return { accessToken, refreshToken };
  }

  async activateUser(link: string) {
    const user = await this.clientService.findByActivationLink(link);

    if (!user) {
      throw new BadRequestException('Invalid or expired activation link');
    }

    await this.clientService.update(user.id, {
      is_verified: true,
      activation_link: null, // чтобы ссылку нельзя было использовать повторно
    });

    return { message: 'Account activated successfully' };
  }



  async registerForUser(createUserDto: CreateClientDto) {
    const existingUser = await this.clientService.findByEmail(
      createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const user = await this.clientService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const activationUrl = `${process.env.API_URL}/api/auth/activate/${user.activation_link}`;
    await this.mailService.sendActivationMail(user.email, activationUrl);
    return { message: "link sent successfully: activate please", email: user.email };
  }

  async registerForAdmin(createUserDto: CreateAdminDto) {
    const existingUser = await this.adminService.findByEmail(
      createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const user = await this.adminService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message: "User registered successfully", userId: user.id };
  }

  async loginForUser(loginDto: LoginDto, res: Response) {
    const user = await this.clientService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException("Invalid email or password");

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!passwordValid)
      throw new UnauthorizedException("Invalid email or password");

    const { accessToken, refreshToken } = await this.generateTokensForUsers(user);

    const hashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.clientService.update(user.id, { refresh_token: hashedRefresh });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Login successful",
      userId: user.id,
      access_token: accessToken,
    };
  }

  async loginForAdmin(loginDto: LoginDto, res: Response) {
    const user = await this.adminService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException("Invalid email or password");

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!passwordValid)
      throw new UnauthorizedException("Invalid email or password");

    const { accessToken, refreshToken } = await this.generateTokensForAdmins(user);

    const hashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.adminService.update(user.id, { refresh_token: hashedRefresh });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Login successful",
      userId: user.id,
      access_token: accessToken,
    };
  }


  async logoutForUser(refreshToken: string, res: Response) {
    if (!refreshToken) throw new UnauthorizedException("Refresh token missing");

    const userData = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.clientService.findOne(userData.id);
    if (!user) throw new UnauthorizedException("User not found");

    await this.clientService.update(user.id, { refresh_token: "" });

    res.clearCookie("refreshToken");
    return { message: "User logged out successfully" };
  }

  async logoutForAdmin(refreshToken: string, res: Response) {
    if (!refreshToken) throw new UnauthorizedException("Refresh token missing");

    const userData = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.adminService.findOne(userData.id);
    if (!user) throw new UnauthorizedException("User not found");

    await this.adminService.update(user.id, { refresh_token: "" });

    res.clearCookie("refreshToken");
    return { message: "User logged out successfully" };
  }

  async refreshTokenForUser(userId: number, refresh_token: string, res: Response) {
    if (!refresh_token) throw new ForbiddenException("Refresh token missing");

    const decoded = this.jwtService.decode(refresh_token);
    if (userId !== decoded["id"]) {
      throw new ForbiddenException("Invalid user for this token");
    }

    const user = await this.clientService.findOne(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException("User not authorized");
    }

    const valid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!valid) throw new ForbiddenException("Invalid refresh token");

    const { accessToken, refreshToken } = await this.generateTokensForUsers(user);
    const newHashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.clientService.update(user.id, { refresh_token: newHashedRefresh });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Access token refreshed successfully",
      userId: user.id,
      access_token: accessToken,
    };
  }

  async refreshTokenForAdmin(userId: number, refresh_token: string, res: Response) {
    if (!refresh_token) throw new ForbiddenException("Refresh token missing");

    const decoded = this.jwtService.decode(refresh_token);
    if (userId !== decoded["id"]) {
      throw new ForbiddenException("Invalid user for this token");
    }

    const user = await this.adminService.findOne(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException("User not authorized");
    }

    const valid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!valid) throw new ForbiddenException("Invalid refresh token");

    const { accessToken, refreshToken } = await this.generateTokensForAdmins(user);
    const newHashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.adminService.update(user.id, { refresh_token: newHashedRefresh });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Access token refreshed successfully",
      userId: user.id,
      access_token: accessToken,
    };
  }

}


