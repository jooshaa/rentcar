import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logging/winston.logging';
import { AllExceptionsFilter } from './common/errors/error.handling';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig)
  });

  app.useGlobalFilters(new AllExceptionsFilter)
  app.setGlobalPrefix("api")
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  const config = new DocumentBuilder()
  .setTitle("Rent-Car")
  .setDescription("fast and easily get a car")
  .setVersion("1.0")
  .addTag("Super RentCar")
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, documentFactory)

  await app.listen(process.env.PORT ?? 3000, ()=>{
    console.log(`Server start at: http://localhost:${process.env.PORT}/api`);
    console.log(`Swagger start at: http://localhost:${process.env.PORT}/api/docs`)
  });
}
bootstrap();
