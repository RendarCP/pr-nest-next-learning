import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value.password) {
      // 비밀번호 강도 검증
      if (!this.isStrongPassword(value.password)) {
        throw new BadRequestException(
          '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.',
        );
      }
    }
    return value;
  }

  private isStrongPassword(password: string): boolean {
    // 최소 8자, 대문자, 소문자, 숫자 포함
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  }

  private isValidPassword(password: string): boolean {
    // 최소 6자 이상
    return Boolean(password && password.length >= 6);
  }
}
