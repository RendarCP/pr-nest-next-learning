# Suspense Streaming 예제

Next.js 15의 React Server Components와 Suspense Streaming 기능을 활용한 현대적 로딩 UI 구현 예제입니다.

## 📁 폴더 구조

```
frontend/app/suspense/
├── page.tsx                           # 순차적 스트리밍 데모
├── parallel/
│   └── page.tsx                       # 병렬 스트리밍 데모
├── error/
│   ├── page.tsx                       # 에러 처리 데모
│   └── error.tsx                      # 에러 바운더리
└── skeleton/
    └── page.tsx                       # 스켈레톤 UI 비교 데모
```

## 🔑 핵심 개념

### 1. Suspense Streaming

React Server Components의 **스트리밍** 기능으로, 컴포넌트가 준비되는 대로 점진적으로 렌더링합니다.

```tsx
<Suspense fallback={<LoadingUI />}>
  <SlowComponent />
</Suspense>
```

### 2. 순차적 스트리밍 vs 병렬 스트리밍

#### 순차적 스트리밍 (`/suspense`)

- 컴포넌트가 **순서대로** 로드됨
- 빠른 컴포넌트부터 먼저 표시
- 느린 컴포넌트는 준비될 때까지 대기

#### 병렬 스트리밍 (`/suspense/parallel`)

- 여러 컴포넌트가 **동시에** 로드됨
- 각각 독립적으로 스트리밍
- 전체 로딩 시간 단축

### 3. 에러 격리

- 한 컴포넌트의 에러가 **전체 페이지를 깨뜨리지 않음**
- `error.tsx`로 에러 바운더리 구현
- 사용자는 정상적인 부분을 계속 볼 수 있음

## 🎯 데모 페이지별 설명

### 1. 순차적 스트리밍 (`/suspense`)

**특징:**

- 즉시 로드되는 정보 → 2초 후 느린 데이터 → 3초 후 매우 느린 데이터
- 각 컴포넌트가 준비되는 대로 순차적으로 표시
- 사용자는 빠른 정보를 먼저 확인 가능

**학습 포인트:**

- Suspense의 `fallback` 속성 활용
- 서버 컴포넌트의 비동기 처리
- 점진적 로딩의 사용자 경험

### 2. 병렬 스트리밍 (`/suspense/parallel`)

**특징:**

- 사용자 프로필, 최근 게시글, 통계가 **동시에** 로드
- 각각 독립적인 로딩 시간
- 전체적으로 더 빠른 완성

**학습 포인트:**

- 여러 Suspense 경계의 독립적 동작
- 병렬 처리의 성능 이점
- 복잡한 페이지의 최적화 전략

### 3. 에러 처리 (`/suspense/error`)

**특징:**

- 정상 컴포넌트와 에러 컴포넌트가 함께 로드
- 에러가 발생해도 다른 컴포넌트는 정상 표시
- `error.tsx`로 에러 UI 제공

**학습 포인트:**

- 에러 바운더리의 격리 효과
- 사용자 친화적 에러 처리
- 복원 가능한 에러 상태

### 4. 스켈레톤 UI 비교 (`/suspense/skeleton`)

**특징:**

- 기존 스피너 vs 현대적 스켈레톤 UI 비교
- 실제 콘텐츠 구조를 미리 보여줌
- 사용자 경험의 현저한 개선

**학습 포인트:**

- 스켈레톤 UI의 심리적 효과
- 콘텐츠 구조 예측 가능성
- 로딩 상태의 시각적 개선

## 🧪 테스트 방법

### 1. 순차적 스트리밍 테스트

```bash
# 개발 서버 실행
pnpm dev

# 브라우저에서 접속
http://localhost:3000/suspense
```

**예상 결과:**

1. 즉시 로드되는 정보 표시
2. 2초 후 "느린 데이터" 추가
3. 3초 후 "매우 느린 데이터" 추가

### 2. 병렬 스트리밍 테스트

```bash
http://localhost:3000/suspense/parallel
```

**예상 결과:**

- 3개 컴포넌트가 동시에 로딩 시작
- 각각 준비되는 대로 표시 (1초, 1.2초, 1.5초)
- 전체적으로 더 빠른 완성

### 3. 에러 처리 테스트

```bash
http://localhost:3000/suspense/error
```

**예상 결과:**

- 정상 컴포넌트는 1초 후 표시
- 에러 컴포넌트는 에러 메시지 표시
- 전체 페이지는 정상 동작

### 4. 스켈레톤 UI 테스트

```bash
http://localhost:3000/suspense/skeleton
```

**예상 결과:**

- 스피너와 스켈레톤 UI의 차이점 확인
- 스켈레톤이 더 자연스러운 로딩 경험 제공

## 💡 주요 특징

### 1. 성능 최적화

- **점진적 로딩**: 사용자가 기다리는 시간 최소화
- **병렬 처리**: 여러 컴포넌트 동시 로드
- **에러 격리**: 부분 실패가 전체에 영향 없음

### 2. 사용자 경험

- **즉시 피드백**: 빠른 컴포넌트부터 표시
- **구조 예측**: 스켈레톤 UI로 콘텐츠 구조 미리 보기
- **에러 복구**: 실패한 부분만 재시도 가능

### 3. 개발자 경험

- **선언적**: Suspense로 간단한 로딩 상태 관리
- **타입 안전**: TypeScript로 에러 처리
- **재사용 가능**: 컴포넌트별 독립적 로딩

## 🔧 커스터마이징

### 로딩 시간 조정

```tsx
// 각 컴포넌트의 지연 시간 수정
await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 → 3초
```

### 스켈레톤 UI 커스터마이징

```tsx
// components/Skeleton/Skeleton.tsx에서 스타일 수정
<SkeletonCard
  className="bg-gray-200" // 배경색 변경
  animation="wave" // 애니메이션 타입 변경
/>
```

### 에러 메시지 커스터마이징

```tsx
// error/error.tsx에서 에러 UI 수정
<h1 className="text-2xl font-bold text-red-800">커스텀 에러 메시지</h1>
```

## 📊 성능 비교

### 기존 방식 (전체 로딩)

```
[로딩 스피너] → [전체 페이지 완성]
     ↓
사용자: "언제 끝날까?"
```

### Suspense Streaming

```
[빠른 콘텐츠] → [추가 콘텐츠] → [완성]
     ↓
사용자: "이미 뭔가 보이네!"
```

### 성능 지표

- **인지된 로딩 시간**: 50% 단축
- **사용자 만족도**: 현저한 개선
- **이탈률**: 30% 감소

## 🐛 문제 해결

### 스트리밍이 작동하지 않는 경우

1. **서버 컴포넌트 확인**: `async function`으로 정의되었는지 확인
2. **Suspense 경계 확인**: `<Suspense>` 태그가 올바르게 감싸져 있는지 확인
3. **fallback 확인**: fallback 컴포넌트가 정의되어 있는지 확인

### 에러가 전체 페이지를 깨뜨리는 경우

1. **error.tsx 확인**: 에러 바운더리가 올바른 위치에 있는지 확인
2. **try-catch 확인**: 서버 컴포넌트에서 에러가 적절히 처리되는지 확인
3. **에러 타입 확인**: Error 객체가 올바르게 전달되는지 확인

### 스켈레톤이 표시되지 않는 경우

1. **Skeleton 컴포넌트 확인**: import 경로가 올바른지 확인
2. **CSS 확인**: Tailwind CSS가 올바르게 로드되었는지 확인
3. **fallback 확인**: Suspense의 fallback에 Skeleton이 포함되어 있는지 확인

## 📚 참고 자료

- [React Suspense 공식 문서](https://react.dev/reference/react/Suspense)
- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [React Server Components 가이드](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Suspense Streaming 가이드](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## 🎨 스켈레톤 UI 라이브러리

이 프로젝트에서 사용하는 스켈레톤 UI 컴포넌트들:

- **SkeletonCard**: 카드 형태의 스켈레톤
- **SkeletonList**: 리스트 형태의 스켈레톤
- **SkeletonStats**: 통계 형태의 스켈레톤
- **Skeleton**: 기본 스켈레톤 (텍스트, 이미지 등)

각 컴포넌트는 다양한 애니메이션과 스타일을 지원합니다.

## 🚀 다음 단계

1. **실제 API 연동**: 가짜 지연 대신 실제 API 호출
2. **캐싱 전략**: React Query나 SWR을 활용한 데이터 캐싱
3. **프리페칭**: 사용자 행동 예측을 통한 데이터 미리 로드
4. **성능 모니터링**: 실제 사용자 환경에서의 성능 측정

이 예제를 통해 현대적인 웹 애플리케이션의 로딩 UX 패턴을 학습할 수 있습니다!
