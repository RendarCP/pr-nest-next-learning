# 프로젝트 설정 가이드

## 📋 설정 완료 항목

### ✅ Backend (NestJS)

#### 프로젝트 구조

- ✅ 기본 NestJS 프로젝트 생성
- ✅ 모듈 기반 아키텍처 구성
  - `modules/auth` - 인증 모듈
  - `modules/users` - 사용자 관리 모듈
  - `modules/posts` - 게시글 CRUD 모듈
- ✅ 공통 기능 구성
  - `common/filters` - HTTP Exception Filter
  - `common/guards` - Auth Guard
  - `common/interceptors` - Logging Interceptor
  - `common/pipes` - Validation Pipe
- ✅ 설정 파일
  - `config/app.config.ts` - 앱 설정

#### 주요 기능

- ✅ DTO & Validation (class-validator, class-transformer)
- ✅ RESTful API 엔드포인트
  - Auth: POST /api/auth/register, /api/auth/login
  - Users: CRUD 엔드포인트
  - Posts: CRUD 엔드포인트
- ✅ 전역 설정 (CORS, Validation Pipe, Exception Filter, Interceptor)
- ✅ 단위 테스트 예제 (UsersService)

#### 설치된 패키지

```json
{
  "@nestjs/common": "^11.1.6",
  "@nestjs/core": "^11.1.6",
  "@nestjs/mapped-types": "^2.0.6",
  "class-validator": "^0.14.1",
  "class-transformer": "^0.5.1"
}
```

### ✅ Frontend (Next.js)

#### 프로젝트 구조

- ✅ Next.js 15 App Router 프로젝트
- ✅ TypeScript 설정
- ✅ Tailwind CSS 4 설정
- ✅ 컴포넌트 구조
  - `lib/ui` - 재사용 가능한 UI 컴포넌트 라이브러리
  - `components/__tests__` - 단위 테스트
  - `e2e` - E2E 테스트
  - `mocks` - MSW 설정

#### UI 컴포넌트 라이브러리

- ✅ **Button** - 다양한 variant/size 지원, 로딩 상태
- ✅ **Card** - 카드 레이아웃 (Header, Title, Content)
- ✅ **Input** - 폼 입력 (라벨, 에러 메시지 지원)
- ✅ **cn 유틸리티** - Tailwind 클래스 병합

#### 테스트 설정

- ✅ Jest 설정 (jest.config.ts, jest.setup.ts)
- ✅ Playwright 설정 (playwright.config.ts)
- ✅ Testing Library 설정
- ✅ MSW 설정 (handlers, browser, server)
- ✅ Button 컴포넌트 단위 테스트 예제

#### Tailwind 설정

- ✅ 커스텀 컬러 팔레트
- ✅ 확장 spacing
- ✅ 커스텀 애니메이션
- ✅ 최적화된 content 경로

#### 설치된 패키지

```json
{
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "jest": "^30.2.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/user-event": "^14.6.1",
    "@playwright/test": "^1.55.1",
    "msw": "^2.11.3",
    "tailwindcss": "^4"
  }
}
```

## 🚀 빠른 시작

### 1. Backend 실행

```bash
cd backend
pnpm install  # 이미 설치됨
pnpm run start:dev
```

**접속:** http://localhost:3001/api

### 2. Frontend 실행

```bash
cd frontend
pnpm install  # 이미 설치됨
pnpm run dev
```

**접속:** http://localhost:3000

## 🧪 테스트 실행

### Backend 테스트

```bash
cd backend
pnpm run test              # 단위 테스트
pnpm run test:watch        # Watch 모드
pnpm run test:e2e          # E2E 테스트
pnpm run test:cov          # 커버리지
```

### Frontend 테스트

```bash
cd frontend
pnpm run test              # 단위 테스트
pnpm run test:watch        # Watch 모드
pnpm run test:coverage     # 커버리지
pnpm run test:e2e          # E2E 테스트
pnpm run test:e2e:ui       # E2E UI 모드
```

## 📚 학습 경로

### Phase 1: 기초 학습 (현재 완료)

- ✅ 프로젝트 구조 이해
- ✅ NestJS 모듈 아키텍처
- ✅ Next.js App Router
- ✅ Tailwind CSS 컴포넌트

### Phase 2: 테스트 학습

- [ ] 컴포넌트 단위 테스트 작성
- [ ] API 통합 테스트
- [ ] E2E 시나리오 작성
- [ ] MSW 활용 API 모킹

### Phase 3: 고급 기능

- [ ] JWT 인증 구현
- [ ] 데이터베이스 연동 (Prisma/TypeORM)
- [ ] 폼 검증 및 에러 처리
- [ ] 파일 업로드
- [ ] WebSocket 통신

### Phase 4: 최적화 & 배포

- [ ] 성능 최적화
- [ ] 테스트 커버리지 향상
- [ ] CI/CD 파이프라인
- [ ] Docker 컨테이너화

## 📖 API 엔드포인트 목록

### Auth

```
POST   /api/auth/register    회원가입
POST   /api/auth/login        로그인
```

### Users

```
GET    /api/users             사용자 목록
GET    /api/users/:id         사용자 조회
POST   /api/users             사용자 생성
PUT    /api/users/:id         사용자 수정
DELETE /api/users/:id         사용자 삭제
```

### Posts

```
GET    /api/posts             게시글 목록
GET    /api/posts/:id         게시글 조회
POST   /api/posts             게시글 생성
PUT    /api/posts/:id         게시글 수정
DELETE /api/posts/:id         게시글 삭제
```

## 🎨 UI 컴포넌트 사용 예제

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from "@/lib/ui";

function Example() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <Input label="이메일" type="email" />
        <Input label="비밀번호" type="password" />
        <Button variant="primary" size="lg">
          로그인
        </Button>
      </CardContent>
    </Card>
  );
}
```

## 🔧 환경 변수 설정

### Backend (.env)

```env
PORT=3001
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📝 다음 단계

1. **Backend**

   - [ ] 데이터베이스 연동
   - [ ] JWT 인증 구현
   - [ ] Swagger 문서화
   - [ ] 추가 모듈 개발

2. **Frontend**

   - [ ] API 연동
   - [ ] 폼 구현
   - [ ] 더 많은 컴포넌트 개발
   - [ ] 테스트 커버리지 향상

3. **통합**
   - [ ] Frontend-Backend 연동
   - [ ] 인증 플로우 구현
   - [ ] E2E 시나리오 작성
   - [ ] 배포 준비

## 🎓 추천 학습 순서

1. **기본 개념 이해**

   - NestJS 공식 문서 읽기
   - Next.js 공식 문서 읽기
   - Testing Library 개념 학습

2. **실습**

   - UsersService 테스트 분석
   - Button 컴포넌트 테스트 분석
   - 새로운 모듈/컴포넌트 추가

3. **심화**
   - E2E 테스트 시나리오 작성
   - MSW로 복잡한 API 모킹
   - 성능 최적화

## 🆘 문제 해결

### Backend가 시작되지 않는 경우

```bash
cd backend
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Frontend 테스트가 실패하는 경우

```bash
cd frontend
npx playwright install
```

### 포트 충돌

- Backend: `PORT=3001` (환경 변수로 변경 가능)
- Frontend: `port: 3000` (next.config.ts에서 변경)

---

**프로젝트 생성 완료!** 🎉

학습 즐기세요!
