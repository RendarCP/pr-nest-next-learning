import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.usersService.create(registerDto);

    // 실제 환경에서는 JWT 토큰 발급
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken: 'mock-jwt-token',
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 실제 환경에서는 비밀번호 검증 및 JWT 토큰 발급
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken: 'mock-jwt-token',
    };
  }
}
