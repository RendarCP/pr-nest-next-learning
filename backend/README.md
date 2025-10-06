# Backend - NestJS 학습 프로젝트

## 📖 개요

NestJS를 활용한 백엔드 시스템 학습 프로젝트입니다. 모듈 기반 아키텍처, Dependency Injection, RESTful API 설계, 테스트 등을 학습합니다.

## 🏗 프로젝트 구조

```
backend/
├── src/
│   ├── modules/              # 기능별 모듈
│   │   ├── auth/            # 인증 모듈
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dto/
│   │   ├── users/           # 사용자 모듈
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.service.spec.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   └── posts/           # 게시글 모듈
│   │       ├── posts.controller.ts
│   │       ├── posts.service.ts
│   │       ├── posts.module.ts
│   │       └── dto/
│   ├── common/              # 공통 기능
│   │   ├── filters/        # Exception Filters
│   │   ├── guards/         # Guards (인증/인가)
│   │   ├── interceptors/   # Interceptors (로깅, 변환)
│   │   ├── pipes/          # Validation Pipes
│   │   └── decorators/     # Custom Decorators
│   ├── config/              # 설정 파일
│   ├── app.module.ts
│   └── main.ts
└── test/                    # E2E 테스트
    └── app.e2e-spec.ts
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run start:dev
```

서버가 `http://localhost:3001`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm run start:prod
```

## 🧪 테스트

### 단위 테스트

```bash
npm run test
```

### 단위 테스트 (Watch 모드)

```bash
npm run test:watch
```

### 테스트 커버리지

```bash
npm run test:cov
```

### E2E 테스트

```bash
npm run test:e2e
```

## 📡 API 엔드포인트

### Auth (인증)

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### Users (사용자)

- `GET /api/users` - 사용자 목록 조회
- `GET /api/users/:id` - 특정 사용자 조회
- `POST /api/users` - 사용자 생성
- `PUT /api/users/:id` - 사용자 정보 수정
- `DELETE /api/users/:id` - 사용자 삭제

### Posts (게시글)

- `GET /api/posts` - 게시글 목록 조회
- `GET /api/posts/:id` - 특정 게시글 조회
- `POST /api/posts` - 게시글 생성
- `PUT /api/posts/:id` - 게시글 수정
- `DELETE /api/posts/:id` - 게시글 삭제

## 🎓 학습 주제

### 1. 모듈 아키텍처

- 기능별 모듈 분리
- 모듈 간 의존성 관리
- 모듈 재사용성

### 2. Dependency Injection

- 의존성 주입 패턴
- Provider 등록 및 사용
- 모듈 간 서비스 공유

### 3. Controllers & Services

- RESTful API 설계
- 비즈니스 로직 분리
- HTTP 메서드 활용

### 4. DTO & Validation

- class-validator를 활용한 입력 검증
- class-transformer를 활용한 데이터 변환
- DTO 패턴 적용

### 5. Exception Filters

- 전역 예외 처리
- 커스텀 예외 필터
- 에러 응답 포맷팅

### 6. Guards

- 인증 가드 구현
- 라우트 보호
- ExecutionContext 활용

### 7. Interceptors

- 요청/응답 로깅
- 데이터 변환
- 성능 모니터링

### 8. Pipes

- 입력 데이터 검증
- 데이터 변환
- ValidationPipe 활용

### 9. Testing

- 단위 테스트 작성
- Service 테스트
- Controller 테스트
- E2E 테스트

## 📦 주요 의존성

- **@nestjs/core** - NestJS 코어
- **@nestjs/common** - 공통 모듈
- **@nestjs/platform-express** - Express 플랫폼
- **class-validator** - 데이터 검증
- **class-transformer** - 데이터 변환
- **rxjs** - 반응형 프로그래밍

## 🔧 설정 파일

- `nest-cli.json` - Nest CLI 설정
- `tsconfig.json` - TypeScript 설정
- `eslint.config.mjs` - ESLint 설정
- `.prettierrc` - Prettier 설정

## 📝 다음 단계

- [ ] 데이터베이스 연동 (TypeORM/Prisma)
- [ ] JWT 인증 구현
- [ ] Swagger API 문서화
- [ ] 환경 변수 관리 (@nestjs/config)
- [ ] 로깅 시스템 (Winston)
- [ ] 캐싱 (Redis)
- [ ] WebSocket 통신
