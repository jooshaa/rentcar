import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { LoginDto } from './dto/create-auth.dto';
import { CookieGetter } from '../common/decorators/cookie-getter';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import type { Response } from 'express';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('activate/:link')
  async activateUser(@Param('link') link: string) {
    return this.authService.activateUser(link);
  }

  @Public()
  @Post("register/user")
  registerUser(@Body() createAuthDto: CreateClientDto) {
    return this.authService.registerForUser(createAuthDto);
  }
  // @Post("register/admin")
  // registerAdmin(@Body() createAuthDto: CreateAdminDto) {
  //   return this.authService.registerForAdmin(createAuthDto);
  // }

  @Public()
  @Post("login/user")
  loginUser(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginForUser(loginDto, res);
  }

  @Public()
  @Post("login/admin")
  loginAdmin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginForAdmin(loginDto, res);
  }

  @Public()
  @Post("logout/user")
  logoutUser(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutForUser(refreshToken, res);
  }

  @Public()
  @Post("logout/admin")
  logoutAdmin(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutForAdmin(refreshToken, res);
  }

  @Public()
  @Post(":id/refresh/user")
  refreshUser(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenForUser(id, refreshToken, res);
  }

  @Public()
  @Post(":id/refresh/admin")
  refreshAdmin(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenForAdmin(id, refreshToken, res);
  }

}
