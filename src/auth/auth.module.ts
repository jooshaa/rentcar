import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import ms from 'ms';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { ClientModule } from '../client/client.module';
import { AdminModule } from '../admin/admin.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY, 
    signOptions: {expiresIn: (process.env.SECRET_TIME||"15h")as ms.StringValue},
  }),
// TypeOrmModule.forFeature([Client])
ClientModule,
AdminModule,
MailModule
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
