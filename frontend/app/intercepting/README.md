# Intercepting Routes 예제

Next.js 15의 Intercepting Routes 기능을 활용한 모달 UI 구현 예제입니다.

## 📁 폴더 구조

```
frontend/app/intercepting/
├── layout.tsx                         # Parallel Routes 레이아웃 (children + modal 슬롯)
├── page.tsx                           # 게시글 리스트 페이지
├── @modal/                            # Parallel Routes 슬롯
│   ├── default.tsx                    # 슬롯 기본값 (모달이 없을 때)
│   └── (.)posts/                      # Intercepting Routes - 같은 레벨 가로채기
│       └── [id]/
│           └── page.tsx              # 모달 UI (클라이언트 컴포넌트)
└── posts/                             # 실제 게시글 라우트
    └── [id]/
        └── page.tsx                   # 전체 페이지 UI (서버 컴포넌트)
```

## 🔑 핵심 개념

### 1. Intercepting Routes

- **`(.)`**: 같은 레벨의 세그먼트 가로채기
- **`(..)`**: 한 레벨 위의 세그먼트 가로채기
- **`(..)(..)`**: 두 레벨 위의 세그먼트 가로채기
- **`(...)`**: 루트부터 가로채기

이 예제에서는 `(.)posts`를 사용하여 같은 레벨(`/intercepting`)의 `posts` 세그먼트를 가로챕니다.

### 2. Parallel Routes

`@modal` 폴더는 Parallel Routes 슬롯입니다. layout.tsx에서 `modal` prop으로 받아 렌더링됩니다.

```tsx
interface InterceptingLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function InterceptingLayout({
  children,
  modal,
}: InterceptingLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

### 3. default.tsx

`default.tsx`는 슬롯이 활성화되지 않았을 때(모달이 없을 때) 렌더링되는 기본값입니다. 모달이 없을 때는 `null`을 반환합니다.

## 🎯 동작 방식

### 1. 리스트 페이지에서 게시글 클릭

```
/intercepting → /intercepting/posts/1
```

- **URL 변경**: `/intercepting/posts/1`
- **실제 렌더링**: `@modal/(.)posts/[id]/page.tsx` (모달)
- **배경**: `/intercepting/page.tsx` (리스트 페이지 유지)

### 2. 브라우저 뒤로가기

```
/intercepting/posts/1 → /intercepting
```

- **URL 변경**: `/intercepting`
- **모달 닫힘**: `@modal/default.tsx` 렌더링 (null 반환)

### 3. 직접 URL 접근 또는 새로고침

```
새 탭에서 /intercepting/posts/1 열기
```

- **URL**: `/intercepting/posts/1`
- **실제 렌더링**: `posts/[id]/page.tsx` (전체 페이지)
- **Intercepting 없음**: 일반 페이지로 표시

## 🧪 테스트 방법

### 1. 모달 열기 테스트

1. `/intercepting` 페이지로 이동
2. 게시글의 "자세히 보기" 버튼 클릭
3. ✅ **예상 결과**: 모달이 열리고 URL이 `/intercepting/posts/1`로 변경

### 2. 모달 닫기 테스트

모달이 열린 상태에서:

- **ESC 키**: 모달 닫힘
- **배경 클릭**: 모달 닫힘
- **브라우저 뒤로가기**: 모달 닫힘

### 3. 직접 접근 테스트

1. 새 탭 열기
2. `/intercepting/posts/1` URL 직접 입력
3. ✅ **예상 결과**: 전체 페이지로 표시 (모달 아님)

### 4. 새로고침 테스트

1. 모달 열기
2. 브라우저 새로고침
3. ✅ **예상 결과**: 전체 페이지로 전환 (모달 → 전체 페이지)

## 💡 주요 특징

### 1. SEO 친화적

- 각 게시글은 고유한 URL을 가짐
- 검색 엔진이 콘텐츠를 인덱싱 가능
- 소셜 미디어 공유 시 올바른 메타데이터 제공

### 2. 사용자 경험

- **빠른 네비게이션**: 페이지 새로고침 없이 콘텐츠 확인
- **컨텍스트 유지**: 리스트 페이지의 스크롤 위치 유지
- **직관적 조작**: ESC, 배경 클릭, 뒤로가기로 모달 닫기

### 3. 개발자 경험

- **타입 안전**: TypeScript로 모든 컴포넌트 타입 정의
- **재사용 가능**: 다른 리스트/상세 페이지에 동일한 패턴 적용 가능
- **점진적 향상**: JavaScript 없이도 기본 네비게이션 작동

## 🔧 커스터마이징

### 모달 스타일 변경

`@modal/(.)posts/[id]/page.tsx`에서 스타일 수정:

```tsx
// 배경 투명도 조정
<div className="bg-black bg-opacity-50">  // 50% → 70%

// 모달 크기 조정
<div className="max-w-3xl">  // 3xl → 4xl
```

### 애니메이션 추가

```tsx
// framer-motion 사용 예시
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
>
  {/* 모달 콘텐츠 */}
</motion.div>;
```

## 🐛 문제 해결

### 모달이 표시되지 않는 경우

1. **폴더 구조 확인**: `@modal/(.)posts/[id]/page.tsx` 경로가 정확한지 확인
2. **layout.tsx 확인**: `modal` prop이 렌더링되는지 확인
3. **default.tsx 확인**: `@modal/default.tsx` 파일이 존재하는지 확인

### 스크롤 문제 해결

1. **배경 스크롤 차단**: 모달이 열릴 때 `document.body.style.overflow = 'hidden'` 적용
2. **스크롤 위치 유지**: 모달 닫힐 때 원래 스크롤 위치로 복원
3. **모달 내부 스크롤**: `overflow-y-auto`로 모달 내부에서만 스크롤 가능
4. **터치 이벤트 처리**: 모바일에서 스크롤 동작 개선

### 모달이 전체 페이지로 표시되는 경우

- **새로고침 확인**: 페이지를 새로고침하면 Intercepting이 무효화됨
- **직접 접근**: URL을 직접 입력하면 일반 페이지로 표시됨
- **의도된 동작**: 이는 Next.js의 정상적인 동작입니다

### ESC 키가 작동하지 않는 경우

- **이벤트 리스너 확인**: `useEffect`에서 키보드 이벤트가 등록되었는지 확인
- **클린업 확인**: 컴포넌트 언마운트 시 이벤트 리스너가 제거되는지 확인

## 📚 참고 자료

- [Next.js Intercepting Routes 공식 문서](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [Next.js Parallel Routes 공식 문서](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Next.js 15 릴리즈 노트](https://nextjs.org/blog/next-15)
