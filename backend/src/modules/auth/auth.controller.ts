import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthLoggingInterceptor } from '../../common/interceptors/auth-logging.interceptor';
import { PasswordValidationPipe } from '../../common/pipes/password-validation.pipe';
import { AuthExceptionFilter } from '../../common/filters/auth-exception.filter';

@Controller('auth')
@UseInterceptors(AuthLoggingInterceptor)
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(PasswordValidationPipe)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
