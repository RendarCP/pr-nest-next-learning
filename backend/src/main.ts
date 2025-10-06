import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: appConfig.corsOrigins,
    credentials: true,
  });

  // 전역 Prefix 설정
  app.setGlobalPrefix(appConfig.apiPrefix);

  // 전역 Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 전역 Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // 전역 Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(appConfig.port);
  console.log(
    `🚀 Application is running on: http://localhost:${appConfig.port}/${appConfig.apiPrefix}`,
  );
}
bootstrap();
