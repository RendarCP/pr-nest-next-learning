import { notFound } from "next/navigation";
import Link from "next/link";

// 목업 데이터 (실제로는 API에서 가져올 데이터)
const posts = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    content: `Next.js 15에서 추가된 서버 컴포넌트, 서버 액션, 그리고 인터셉팅 라우트에 대해 알아보겠습니다.

## 주요 새로운 기능들

### 1. 서버 컴포넌트 (Server Components)
- 클라이언트 사이드 JavaScript 없이 서버에서 렌더링
- 번들 크기 감소 및 성능 향상
- 데이터베이스 직접 접근 가능

### 2. 서버 액션 (Server Actions)
- API 라우트 없이 서버에서 함수 실행
- 폼 제출 및 데이터 변조에 최적화
- 타입 안전성 보장

### 3. 인터셉팅 라우트 (Intercepting Routes)
- 모달 UI 구현에 최적화
- URL 유지하면서 오버레이 표시
- 뒤로가기 및 직접 접근 지원

이러한 기능들을 통해 더 나은 사용자 경험과 개발자 경험을 제공합니다.`,
    author: "김개발",
    date: "2024-12-19",
    category: "기술",
    readTime: "5분",
    views: 1234,
    likes: 89,
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    content: `RSC의 장점과 사용법, 그리고 기존 클라이언트 컴포넌트와의 차이점을 자세히 설명합니다.

## React Server Components란?

React Server Components는 서버에서 렌더링되는 React 컴포넌트입니다. 기존의 클라이언트 컴포넌트와 달리 브라우저로 전송되지 않아 번들 크기를 줄이고 성능을 향상시킵니다.

## 주요 장점

### 1. 성능 향상
- 초기 JavaScript 번들 크기 감소
- 서버에서 직접 데이터베이스 접근
- 클라이언트 사이드 렌더링 오버헤드 제거

### 2. 보안 강화
- 민감한 API 키나 데이터베이스 연결 정보가 클라이언트에 노출되지 않음
- 서버 사이드에서만 실행되는 로직 보장

### 3. 개발자 경험
- 기존 React 컴포넌트와 동일한 문법 사용
- 점진적 도입 가능
- 타입 안전성 유지

## 사용 시나리오

- 정적 콘텐츠 렌더링
- 데이터베이스 쿼리 결과 표시
- 서버 사이드 로직이 필요한 컴포넌트`,
    author: "박프론트",
    date: "2024-12-18",
    category: "React",
    readTime: "8분",
    views: 2156,
    likes: 156,
  },
  {
    id: 3,
    title: "Tailwind CSS 4.0 새로운 기능",
    content: `Tailwind CSS 4.0에서 추가된 새로운 유틸리티 클래스와 성능 개선사항을 살펴봅니다.

## Tailwind CSS 4.0 주요 변경사항

### 1. 새로운 컬러 팔레트
- 더 풍부한 색상 옵션
- 다크 모드 개선
- 접근성 고려한 색상 대비

### 2. 성능 최적화
- 더 빠른 빌드 시간
- 최적화된 CSS 출력
- 트리 쉐이킹 개선

### 3. 새로운 유틸리티
- 컨테이너 쿼리 지원
- 새로운 레이아웃 유틸리티
- 향상된 반응형 디자인

## 마이그레이션 가이드

기존 프로젝트를 Tailwind CSS 4.0으로 업그레이드하는 방법을 단계별로 설명합니다.`,
    author: "이스타일",
    date: "2024-12-17",
    category: "CSS",
    readTime: "6분",
    views: 1876,
    likes: 98,
  },
  {
    id: 4,
    title: "TypeScript 5.7 업데이트",
    content: `TypeScript 5.7에서 추가된 새로운 타입 기능들과 개발자 경험 개선사항을 알아봅니다.

## TypeScript 5.7 새로운 기능

### 1. 향상된 타입 추론
- 더 정확한 타입 추론
- 복잡한 제네릭 타입 처리 개선
- 유니온 타입 최적화

### 2. 새로운 타입 유틸리티
- 더 강력한 타입 조작
- 조건부 타입 개선
- 매핑된 타입 최적화

### 3. 개발자 경험
- 더 나은 에러 메시지
- 향상된 IntelliSense
- 빠른 타입 체크

## 실무 적용 사례

실제 프로젝트에서 TypeScript 5.7의 새로운 기능을 활용하는 방법을 예제와 함께 설명합니다.`,
    author: "최타입",
    date: "2024-12-16",
    category: "TypeScript",
    readTime: "7분",
    views: 3245,
    likes: 203,
  },
];

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{post.readTime} 읽기</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-gray-700">{post.author}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{post.views.toLocaleString()} 조회</span>
              <span>{post.likes} 좋아요</span>
            </div>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <span>👍</span>
                <span>좋아요 {post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <span>💬</span>
                <span>댓글</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <span>📤</span>
                <span>공유</span>
              </button>
            </div>

            <Link
              href="/intercepting"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
