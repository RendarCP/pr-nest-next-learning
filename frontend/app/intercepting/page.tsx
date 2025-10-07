import Link from "next/link";

// 목업 데이터
const posts = [
  {
    id: 1,
    title: "Next.js 15의 새로운 기능들",
    content:
      "Next.js 15에서 추가된 서버 컴포넌트, 서버 액션, 그리고 인터셉팅 라우트에 대해 알아보겠습니다.",
    author: "김개발",
    date: "2024-12-19",
    category: "기술",
  },
  {
    id: 2,
    title: "React Server Components 완벽 가이드",
    content:
      "RSC의 장점과 사용법, 그리고 기존 클라이언트 컴포넌트와의 차이점을 자세히 설명합니다.",
    author: "박프론트",
    date: "2024-12-18",
    category: "React",
  },
  {
    id: 3,
    title: "Tailwind CSS 4.0 새로운 기능",
    content:
      "Tailwind CSS 4.0에서 추가된 새로운 유틸리티 클래스와 성능 개선사항을 살펴봅니다.",
    author: "이스타일",
    date: "2024-12-17",
    category: "CSS",
  },
  {
    id: 4,
    title: "TypeScript 5.7 업데이트",
    content:
      "TypeScript 5.7에서 추가된 새로운 타입 기능들과 개발자 경험 개선사항을 알아봅니다.",
    author: "최타입",
    date: "2024-12-16",
    category: "TypeScript",
  },
];

export default function InterceptingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Intercepting Routes 예제
          </h1>
          <p className="text-gray-600 mb-4">
            Next.js 15의 Intercepting Routes 기능을 활용한 모달 UI 예제입니다.
            게시글을 클릭하면 모달로 상세 내용을 확인할 수 있습니다.
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 text-sm">
              <strong>✅ Intercepting Routes 설정 완료!</strong> 아래 게시글을
              클릭하면 모달로 상세 내용을 확인할 수 있습니다. 모달이 표시되는
              동안 URL이 변경되고, ESC 키나 배경 클릭으로 모달을 닫을 수
              있습니다.
            </p>
          </div>
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              <strong>💡 테스트 방법:</strong>
            </p>
            <ul className="text-blue-800 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>
                게시글의 "자세히 보기" 클릭 → 모달이 열립니다 (Intercepting
                Routes)
              </li>
              <li>브라우저 뒤로가기 → 모달이 닫힙니다</li>
              <li>새 탭에서 게시글 URL 직접 열기 → 전체 페이지로 표시됩니다</li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/suspense"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← Suspense Streaming 테스트
            </Link>
            <Link
              href="/intercepting/test-modal"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              간단한 모달 테스트
            </Link>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            게시글 목록
          </h2>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      작성자: {post.author}
                    </span>
                    <Link
                      href={`/intercepting/posts/${post.id}`}
                      className="text-primary-600 hover:text-primary-500 font-medium"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 설명 섹션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Intercepting Routes의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                모달 UI 구현
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>URL 유지:</strong> 모달이 열려도 URL이 변경되지
                  않습니다
                </li>
                <li>
                  • <strong>뒤로가기 지원:</strong> 브라우저 뒤로가기로 모달을
                  닫을 수 있습니다
                </li>
                <li>
                  • <strong>직접 접근:</strong> 모달 URL로 직접 접근하면 전체
                  페이지로 표시됩니다
                </li>
                <li>
                  • <strong>SEO 친화적:</strong> 검색 엔진이 콘텐츠를 인덱싱할
                  수 있습니다
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                사용자 경험
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>빠른 네비게이션:</strong> 페이지 새로고침 없이
                  콘텐츠 확인
                </li>
                <li>
                  • <strong>컨텍스트 유지:</strong> 목록 페이지의 스크롤 위치
                  유지
                </li>
                <li>
                  • <strong>직관적 조작:</strong> ESC 키나 배경 클릭으로 모달
                  닫기
                </li>
                <li>
                  • <strong>반응형:</strong> 모바일에서는 전체 화면으로 표시
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
