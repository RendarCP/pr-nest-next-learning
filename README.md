# NestJS & Next.js 학습 프로젝트

이 프로젝트는 NestJS 백엔드 시스템과 Next.js 프론트엔드 테스트 코드를 학습하기 위한 모노레포 구조입니다.

## 📁 프로젝트 구조

```
pr-nest-next-learning/
├── backend/          # NestJS 백엔드
│   ├── src/
│   │   ├── modules/     # 기능별 모듈 (auth, users, posts)
│   │   ├── common/      # 공통 유틸리티 (filters, guards, interceptors, pipes)
│   │   └── config/      # 설정 파일
│   └── test/            # E2E 테스트
│
└── frontend/         # Next.js 프론트엔드
    ├── app/             # Next.js 앱 디렉토리
    ├── components/      # React 컴포넌트
    │   └── __tests__/   # 단위 테스트
    ├── lib/
    │   ├── ui/          # 커스텀 UI 컴포넌트 라이브러리
    │   └── utils/       # 유틸리티 함수
    ├── e2e/             # Playwright E2E 테스트
    └── mocks/           # MSW 목 서버
```

## 🎯 학습 목표

### Backend (NestJS)

- ✅ 모듈 기반 아키텍처
- ✅ Dependency Injection
- ✅ Guards, Filters, Interceptors, Pipes
- ✅ RESTful API 설계
- ✅ DTO & Validation
- ✅ Unit & E2E Testing

### Frontend (Next.js)

- ✅ App Router (Next.js 13+)
- ✅ 단위 테스트 (Jest + Testing Library)
- ✅ E2E 테스트 (Playwright)
- ✅ MSW를 통한 API Mocking
- ✅ Tailwind CSS 베스트 프랙티스
- ✅ 커스텀 컴포넌트 라이브러리

## 🚀 시작하기

### Backend 실행

```bash
cd backend
npm install
npm run start:dev  # 개발 모드
npm run test       # 단위 테스트
npm run test:e2e   # E2E 테스트
```

**API 엔드포인트:** `http://localhost:3001/api`

### Frontend 실행

```bash
cd frontend
npm install
npm run dev              # 개발 서버
npm run test             # 단위 테스트
npm run test:watch       # 테스트 Watch 모드
npm run test:e2e         # Playwright E2E 테스트
npm run test:e2e:ui      # Playwright UI 모드
```

**프론트엔드:** `http://localhost:3000`

## 📚 주요 기술 스택

### Backend

- **Framework:** NestJS
- **Language:** TypeScript
- **Validation:** class-validator, class-transformer
- **Testing:** Jest

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Testing:** Jest, Testing Library, Playwright, MSW
- **UI Utils:** clsx, tailwind-merge

## 🧪 테스트 전략

### Backend

- **단위 테스트:** 서비스 로직 검증
- **E2E 테스트:** API 엔드포인트 전체 흐름 검증

### Frontend

- **단위 테스트:** 컴포넌트 렌더링 및 사용자 상호작용
- **E2E 테스트:** 실제 브라우저 환경에서 전체 사용자 플로우
- **MSW:** API 요청 모킹

## 🎨 UI 컴포넌트 라이브러리

`lib/ui/` 디렉토리에 Tailwind 기반 재사용 가능한 컴포넌트를 포함:

- **Button:** 다양한 variant (primary, secondary, outline, ghost, danger)
- **Card:** 카드 레이아웃 컴포넌트
- **Input:** 폼 입력 컴포넌트 (라벨, 에러 메시지 지원)

### 사용 예시

```tsx
import { Button, Card, Input } from '@/lib/ui'

<Button variant="primary" size="lg">
  클릭하세요
</Button>

<Card variant="elevated">
  <CardHeader>
    <CardTitle>제목</CardTitle>
  </CardHeader>
  <CardContent>
    내용
  </CardContent>
</Card>

<Input
  label="이메일"
  type="email"
  error="유효한 이메일을 입력하세요"
/>
```

## 🛠 개발 도구

- **ESLint:** 코드 품질 및 스타일 가이드
- **Prettier:** 코드 포맷팅
- **TypeScript:** 타입 안정성

## 📖 학습 자료

### Backend 모듈 구조

- `modules/auth`: 인증 관련 로직
- `modules/users`: 사용자 관리
- `modules/posts`: 게시글 CRUD
- `common/`: 공통 기능 (필터, 가드, 인터셉터, 파이프)

### Frontend 테스트 예제

- `components/__tests__/`: 컴포넌트 단위 테스트
- `e2e/`: Playwright E2E 테스트
- `mocks/`: MSW 핸들러

## 📝 라이선스

MIT
