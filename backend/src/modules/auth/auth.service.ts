import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // 비밀번호 암호화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // JWT Refresh Token 생성
    const refreshToken = this.generateRefreshToken(user.id);

    // 사용자에게 Refresh Token 저장
    await this.usersService.update(user.id, { refreshToken });

    // JWT Access Token 발급
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // JWT Refresh Token 생성
    const refreshToken = this.generateRefreshToken(user.id);

    // 사용자에게 Refresh Token 저장
    await this.usersService.update(user.id, { refreshToken });

    // JWT Access Token 발급
    const payload = { email: user.email, username: user.name, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    // Refresh Token으로 사용자 찾기
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
    }

    // JWT Refresh Token 검증 (선택적)
    try {
      const payload = this.jwtService.verify(refreshToken);
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
      }
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
    }

    // 새로운 JWT Refresh Token 생성
    const newRefreshToken = this.generateRefreshToken(user.id);

    // 사용자에게 새로운 Refresh Token 저장
    await this.usersService.update(user.id, { refreshToken: newRefreshToken });

    // 새로운 JWT Access Token 발급
    const accessTokenPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(accessTokenPayload);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: number) {
    // 사용자의 Refresh Token 무효화
    await this.usersService.update(userId, { refreshToken: null });
    return { message: '로그아웃되었습니다.' };
  }

  private generateRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { sub: userId, type: 'nest-project-refresh', userId },
      { expiresIn: '7d' },
    );
  }
}
