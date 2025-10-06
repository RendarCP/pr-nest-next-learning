import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // 인증 관련 에러 특별 처리
    const isAuthError = request.url.includes('/auth/');

    if (isAuthError) {
      this.logger.error(
        `[AUTH ERROR] ${request.method} ${request.url} - ${exception.message}`,
        exception.stack,
      );
    }

    // 사용자 친화적인 에러 메시지
    let message = exception.message;
    if (status === HttpStatus.UNAUTHORIZED) {
      message = '인증이 필요합니다.';
    } else if (status === HttpStatus.CONFLICT) {
      message = '이미 존재하는 사용자입니다.';
    } else if (status === HttpStatus.BAD_REQUEST) {
      message = '잘못된 요청입니다.';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(isAuthError && {
        authError: true,
        suggestion: '올바른 이메일과 비밀번호를 입력해주세요.',
      }),
    });
  }
}
