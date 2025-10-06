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
export class AuthLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const ip = request.ip || request.connection.remoteAddress;
    const now = Date.now();

    // 인증 관련 요청 특별 로깅
    this.logger.log(`[AUTH] ${method} ${url} - IP: ${ip} - START`);

    return next.handle().pipe(
      tap((response) => {
        const responseTime = Date.now() - now;
        const isSuccess = response && (response as any).accessToken;

        this.logger.log(
          `[AUTH] ${method} ${url} - ${isSuccess ? 'SUCCESS' : 'FAILED'} - ${responseTime}ms`,
        );
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        this.logger.error(
          `[AUTH] ${method} ${url} - ERROR - ${responseTime}ms - ${error.message}`,
          error.stack,
        );
        return throwError(() => error);
      }),
    );
  }
}
