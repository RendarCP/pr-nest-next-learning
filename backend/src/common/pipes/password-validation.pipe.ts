import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // body 타입이고 password 필드가 있는 경우만 검증
    if (metadata.type === 'body' && value?.password) {
      this.validatePassword(value.password);
    }
    return value;
  }

  private validatePassword(password: string): void {
    // 기본 길이 검증
    if (!password || password.length < 6) {
      throw new BadRequestException('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    // 강도 검증 (대문자, 소문자, 숫자 포함)
    if (!this.isStrongPassword(password)) {
      throw new BadRequestException(
        '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.',
      );
    }
  }

  private isStrongPassword(password: string): boolean {
    // 최소 8자, 대문자, 소문자, 숫자 포함
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  }
}
