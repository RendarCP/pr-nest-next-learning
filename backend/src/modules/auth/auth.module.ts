import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthLoggingInterceptor } from '../../common/interceptors/auth-logging.interceptor';
import { PasswordValidationPipe } from '../../common/pipes/password-validation.pipe';
import { AuthExceptionFilter } from '../../common/filters/auth-exception.filter';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthLoggingInterceptor,
    PasswordValidationPipe,
    AuthExceptionFilter,
  ],
})
export class AuthModule {}
