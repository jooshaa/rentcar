import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
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
