# 기술 컨텍스트

## 기술 스택 개요

### 백엔드 기술 스택

- **프레임워크**: NestJS 11.x
- **언어**: TypeScript 5.7.x
- **데이터베이스**: PostgreSQL 8.x
- **ORM**: TypeORM 0.3.x
- **검증**: class-validator, class-transformer
- **테스트**: Jest, Supertest
- **개발 도구**: ESLint, Prettier

### 프론트엔드 기술 스택

- **프레임워크**: Next.js 15.5.x (App Router)
- **UI 라이브러리**: React 19.1.x
- **스타일링**: Tailwind CSS 4.x
- **언어**: TypeScript 5.x
- **테스트**: Jest, Testing Library, Playwright
- **모킹**: MSW (Mock Service Worker)
- **유틸리티**: clsx, tailwind-merge

### 개발 도구

- **패키지 매니저**: pnpm (workspace)
- **버전 관리**: Git
- **코드 품질**: ESLint, Prettier
- **타입 체크**: TypeScript
- **테스트**: Jest, Playwright
- **개발 서버**: Next.js Dev Server, NestJS Dev Server

## 백엔드 기술 세부사항

### NestJS 설정

```typescript
// main.ts
const app = await NestFactory.create(AppModule);
app.setGlobalPrefix("api");
app.useGlobalPipes(new ValidationPipe());
app.useGlobalFilters(new HttpExceptionFilter());
app.useGlobalInterceptors(new LoggingInterceptor());
```

### 데이터베이스 설정

```typescript
// database.config.ts
export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post],
  synchronize: process.env.NODE_ENV === "development",
};
```

### 주요 의존성

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.0.1",
  "@nestjs/typeorm": "^11.0.0",
  "@nestjs/config": "^4.0.2",
  "typeorm": "^0.3.27",
  "pg": "^8.16.3",
  "class-validator": "^0.14.2",
  "class-transformer": "^0.5.1"
}
```

### 개발 의존성

```json
{
  "@nestjs/cli": "^11.0.0",
  "@nestjs/testing": "^11.0.1",
  "jest": "^30.0.0",
  "supertest": "^7.0.0",
  "eslint": "^9.18.0",
  "prettier": "^3.4.2"
}
```

## 프론트엔드 기술 세부사항

### Next.js 설정

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};
```

### Tailwind CSS 설정

```typescript
// tailwind.config.ts
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
```

### 주요 의존성

```json
{
  "next": "15.5.4",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "tailwindcss": "^4",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1"
}
```

### 테스트 의존성

```json
{
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^14.6.1",
  "@playwright/test": "^1.55.1",
  "msw": "^2.11.3",
  "jest": "^30.2.0"
}
```

## 개발 환경 설정

### 환경 변수

```env
# Backend (.env)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nest_learning
NODE_ENV=development
PORT=3001
API_PREFIX=api
CORS_ORIGINS=http://localhost:3000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 스크립트 설정

```json
// Backend package.json
{
  "scripts": {
    "start:dev": "nest start --watch",
    "test": "jest",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  }
}

// Frontend package.json
{
  "scripts": {
    "dev": "next dev",
    "test": "jest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## 테스트 설정

### Jest 설정 (Backend)

```javascript
// jest.config.js
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
```

### Jest 설정 (Frontend)

```javascript
// jest.config.ts
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "app/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
  ],
};
```

### Playwright 설정

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

## 성능 최적화

### 백엔드 최적화

- **데이터베이스 인덱싱**: 자주 조회되는 컬럼에 인덱스 설정
- **쿼리 최적화**: N+1 문제 방지를 위한 관계 로딩 최적화
- **캐싱**: Redis를 통한 응답 캐싱
- **압축**: gzip 압축 활성화

### 프론트엔드 최적화

- **코드 분할**: 동적 임포트를 통한 번들 크기 최적화
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **CSS 최적화**: Tailwind CSS의 PurgeCSS 기능
- **번들 분석**: webpack-bundle-analyzer를 통한 번들 크기 모니터링

## 보안 고려사항

### 백엔드 보안

- **입력 검증**: class-validator를 통한 DTO 검증
- **SQL 인젝션 방지**: TypeORM의 파라미터화된 쿼리
- **CORS 설정**: 허용된 도메인만 접근 가능
- **환경 변수**: 민감한 정보는 환경 변수로 관리

### 프론트엔드 보안

- **XSS 방지**: React의 자동 이스케이핑
- **CSRF 방지**: SameSite 쿠키 설정
- **환경 변수**: NEXT*PUBLIC* 접두사로 클라이언트 노출 제어
- **Content Security Policy**: CSP 헤더 설정

## 배포 고려사항

### 개발 환경

- **로컬 개발**: Docker Compose를 통한 데이터베이스 설정
- **핫 리로드**: 개발 중 즉시 변경사항 반영
- **디버깅**: VS Code 디버거 설정

### 프로덕션 환경

- **컨테이너화**: Docker를 통한 배포
- **환경 분리**: 개발/스테이징/프로덕션 환경 분리
- **모니터링**: 로그 수집 및 에러 추적
- **스케일링**: 로드 밸런서를 통한 수평 확장
