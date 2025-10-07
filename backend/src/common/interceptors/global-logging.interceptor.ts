import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request } from 'express';
import { throwError } from 'rxjs';

@Injectable()
export class GlobalLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GlobalLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const userAgent = request.get('User-Agent') || '';
    const ip = request.ip || request.connection.remoteAddress;
    const now = Date.now();

    // 인증 관련 요청인지 확인
    const isAuthRequest = url.includes('/auth/');

    // 요청 시작 로깅
    if (isAuthRequest) {
      this.logger.log(`[AUTH] ${method} ${url} - IP: ${ip} - START`);
    } else {
      this.logger.log(
        `[${method}] ${url} - START - IP: ${ip} - UserAgent: ${userAgent}`,
      );
    }

    return next.handle().pipe(
      tap(response => {
        const responseTime = Date.now() - now;

        if (isAuthRequest) {
          // 인증 요청 특별 처리
          const isSuccess = response && (response as any).accessToken;
          this.logger.log(
            `[AUTH] ${method} ${url} - ${isSuccess ? 'SUCCESS' : 'FAILED'} - ${responseTime}ms`,
          );
        } else {
          // 일반 요청 처리
          this.logger.log(
            `[${method}] ${url} - SUCCESS - ${responseTime}ms - Response: ${JSON.stringify(response).substring(0, 100)}...`,
          );
        }
      }),
      catchError(error => {
        const responseTime = Date.now() - now;

        if (isAuthRequest) {
          this.logger.error(
            `[AUTH] ${method} ${url} - ERROR - ${responseTime}ms - ${error.message}`,
            error.stack,
          );
        } else {
          this.logger.error(
            `[${method}] ${url} - ERROR - ${responseTime}ms - Error: ${error.message}`,
            error.stack,
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
