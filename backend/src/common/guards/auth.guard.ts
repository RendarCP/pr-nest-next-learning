import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // 실제 환경에서는 JWT 토큰 검증
    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    // Mock 구현 - 실제로는 JWT 검증 로직 필요
    const authHeader = request.headers.authorization;
    return !!authHeader;
  }
}
