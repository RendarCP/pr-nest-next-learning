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
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let suggestion: string = '';

    // HTTP 예외인지 확인
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      // 서버 내부 에러
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '서버 내부 오류가 발생했습니다.';
    }

    // 인증 관련 에러인지 확인
    const isAuthError = request.url.includes('/auth/');

    // 도메인별 특별 처리
    if (isAuthError) {
      message = this.handleAuthError(status, message, request);
      suggestion = '올바른 이메일과 비밀번호를 입력해주세요.';
    } else {
      message = this.handleGeneralError(status, message, request);
    }

    // 로깅
    this.logError(exception, request, status, message, isAuthError);

    // 응답 생성
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(isAuthError && {
        authError: true,
        suggestion,
      }),
    };

    response.status(status).json(errorResponse);
  }

  private handleAuthError(status: number, _message: string, _request: Request) {
    // 인증 에러 특별 처리
    if (status === HttpStatus.UNAUTHORIZED) {
      return '인증이 필요합니다.';
    } else if (status === HttpStatus.CONFLICT) {
      return '이미 존재하는 사용자입니다.';
    } else if (status === HttpStatus.BAD_REQUEST) {
      return '입력값을 확인해주세요.';
    }
    return _message;
  }

  private handleGeneralError(
    status: number,
    _message: string,
    _request: Request,
  ) {
    // 일반 에러 처리
    if (status === HttpStatus.NOT_FOUND) {
      return '요청한 리소스를 찾을 수 없습니다.';
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return '서버 내부 오류가 발생했습니다.';
    }
    return _message;
  }

  private logError(
    exception: unknown,
    request: Request,
    status: number,
    message: string,
    isAuthError: boolean,
  ) {
    const logMessage = `[${request.method}] ${request.url} - Status: ${status} - Message: ${message}`;

    if (isAuthError) {
      this.logger.error(
        `[AUTH ERROR] ${logMessage}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else if (status >= 500) {
      this.logger.error(
        `[SERVER ERROR] ${logMessage}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(`[CLIENT ERROR] ${logMessage}`);
    }
  }
}
