# Frontend - Next.js 학습 프로젝트

## 📖 개요

Next.js를 활용한 프론트엔드 테스트 코드 학습 프로젝트입니다. 단위 테스트, E2E 테스트, MSW를 활용한 API 모킹, Tailwind CSS 베스트 프랙티스를 학습합니다.

## 🏗 프로젝트 구조

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
├── components/               # React 컴포넌트
│   └── __tests__/           # 컴포넌트 단위 테스트
│       └── Button.test.tsx
├── lib/
│   ├── ui/                  # 커스텀 UI 컴포넌트 라이브러리
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   └── utils/               # 유틸리티 함수
│       └── cn.ts           # className 병합 유틸
├── e2e/                     # Playwright E2E 테스트
│   └── example.spec.ts
├── mocks/                   # MSW API 모킹
│   ├── handlers.ts
│   ├── browser.ts
│   └── server.ts
├── jest.config.ts           # Jest 설정
├── jest.setup.ts            # Jest 초기 설정
├── playwright.config.ts     # Playwright 설정
└── tailwind.config.ts       # Tailwind CSS 설정
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 🧪 테스트

### 단위 테스트 (Jest + Testing Library)

```bash
npm run test              # 전체 테스트 실행
npm run test:watch        # Watch 모드
npm run test:coverage     # 커버리지 리포트
```

### E2E 테스트 (Playwright)

```bash
npm run test:e2e          # Headless 모드
npm run test:e2e:ui       # UI 모드 (디버깅용)
```

## 🎓 학습 주제

### 1. 단위 테스트 (Unit Testing)

**Jest + Testing Library**를 사용한 컴포넌트 테스트

```typescript
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/lib/ui/Button";

test("버튼 클릭 이벤트", async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);

  await userEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**학습 내용:**

- 컴포넌트 렌더링 테스트
- 사용자 상호작용 시뮬레이션
- Props 검증
- 조건부 렌더링 테스트
- Mock 함수 활용

### 2. E2E 테스트 (Playwright)

실제 브라우저 환경에서 전체 사용자 플로우 테스트

```typescript
// example.spec.ts
import { test, expect } from "@playwright/test";

test("홈페이지 로드", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Next.js/);
});
```

**학습 내용:**

- 페이지 네비게이션
- 폼 제출 테스트
- API 응답 대기
- 스크린샷 캡처
- 다중 브라우저 테스트

### 3. MSW (Mock Service Worker)

API 요청을 가로채서 모킹

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([{ id: 1, name: "John" }]);
  }),
];
```

**학습 내용:**

- API 응답 모킹
- 에러 시나리오 테스트
- 네트워크 지연 시뮬레이션
- 통합 테스트

### 4. Tailwind CSS 베스트 프랙티스

**컴포넌트 라이브러리 구조**

```typescript
// lib/ui/Button.tsx
import { cn } from "@/lib/utils/cn";

export const Button = ({ className, variant, ...props }) => {
  return (
    <button
      className={cn("base-styles", variants[variant], className)}
      {...props}
    />
  );
};
```

**학습 내용:**

- 유틸리티 클래스 조합
- 조건부 스타일링
- 테마 커스터마이징
- 반응형 디자인
- 재사용 가능한 컴포넌트

## 🎨 UI 컴포넌트 라이브러리

### Button

```tsx
<Button variant="primary" size="lg" isLoading>
  제출하기
</Button>
```

**Props:**

- `variant`: primary, secondary, outline, ghost, danger
- `size`: sm, md, lg
- `isLoading`: 로딩 스피너 표시

### Card

```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>제목</CardTitle>
  </CardHeader>
  <CardContent>카드 내용</CardContent>
</Card>
```

**Props:**

- `variant`: default, bordered, elevated

### Input

```tsx
<Input label="이메일" type="email" error="유효한 이메일을 입력하세요" />
```

**Props:**

- `label`: 라벨 텍스트
- `error`: 에러 메시지

## 📦 주요 의존성

### Core

- **next** - Next.js 프레임워크
- **react** - React 라이브러리
- **typescript** - 타입스크립트

### Testing

- **jest** - 테스트 프레임워크
- **@testing-library/react** - React 테스팅 라이브러리
- **@testing-library/user-event** - 사용자 이벤트 시뮬레이션
- **@playwright/test** - E2E 테스트
- **msw** - API 모킹

### Styling

- **tailwindcss** - 유틸리티 CSS
- **clsx** - 클래스네임 조합
- **tailwind-merge** - Tailwind 클래스 병합

## 🔧 설정 파일

- `jest.config.ts` - Jest 테스트 설정
- `jest.setup.ts` - Jest 초기화
- `playwright.config.ts` - Playwright E2E 설정
- `tailwind.config.ts` - Tailwind CSS 테마 설정
- `tsconfig.json` - TypeScript 설정
- `next.config.js` - Next.js 설정

## 📝 테스트 작성 가이드

### 컴포넌트 테스트 체크리스트

- [ ] 컴포넌트가 올바르게 렌더링되는가?
- [ ] Props가 올바르게 전달되는가?
- [ ] 사용자 상호작용이 올바르게 동작하는가?
- [ ] 조건부 렌더링이 올바르게 동작하는가?
- [ ] 에러 상태가 올바르게 표시되는가?
- [ ] 로딩 상태가 올바르게 표시되는가?

### E2E 테스트 체크리스트

- [ ] 페이지가 올바르게 로드되는가?
- [ ] 네비게이션이 올바르게 동작하는가?
- [ ] 폼 제출이 올바르게 처리되는가?
- [ ] API 에러를 올바르게 처리하는가?
- [ ] 인증 플로우가 올바르게 동작하는가?

## 📝 다음 단계

- [ ] React Hook 테스트
- [ ] 통합 테스트 시나리오 추가
- [ ] 시각적 회귀 테스트 (Storybook)
- [ ] 접근성 테스트 (axe-core)
- [ ] 성능 테스트
- [ ] 국제화(i18n) 테스트
- [ ] SSR/SSG 테스트
