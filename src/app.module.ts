import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModelModule } from './car-model/car-model.module';
import { CarExpensesModule } from './car-expenses/car-expenses.module';
import { CarModule } from './car/car.module';
import { BranchesModule } from './branches/branches.module';
import { CarUnavailablitiesModule } from './car_unavailablities/car_unavailablities.module';
import { RentalsModule } from './rentals/rentals.module';
import { ClientModule } from './client/client.module';
import { ChargesModule } from './charges/charges.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';
import { OnlineRentModeModule } from './online_rent_mode/online_rent_mode.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AuthService } from './auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.auth';


@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    })
    
    
    
    
    ,BrandsModule, CarModelModule, CarExpensesModule, CarModule, BranchesModule, CarUnavailablitiesModule, RentalsModule, ClientModule, ChargesModule, PaymentsModule, AdminModule, OnlineRentModeModule, AuthModule, MailModule],
  controllers: [],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
