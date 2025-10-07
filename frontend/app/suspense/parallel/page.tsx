import { Suspense } from "react";
import Link from "next/link";

// 병렬로 로드되는 컴포넌트들
async function UserProfile() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-blue-800">사용자 프로필</h3>
      <div className="mt-2">
        <p className="text-blue-700">이름: 홍길동</p>
        <p className="text-blue-700">이메일: hong@example.com</p>
        <p className="text-blue-700">가입일: 2024-01-15</p>
      </div>
    </div>
  );
}

async function RecentPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const posts = [
    { id: 1, title: "첫 번째 게시글", date: "2024-12-19" },
    { id: 2, title: "두 번째 게시글", date: "2024-12-18" },
    { id: 3, title: "세 번째 게시글", date: "2024-12-17" },
  ];

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-green-800">최근 게시글</h3>
      <div className="mt-2 space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="text-green-700">
            <div className="font-medium">{post.title}</div>
            <div className="text-sm text-green-600">{post.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function Notifications() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const notifications = [
    { id: 1, message: "새로운 댓글이 있습니다", time: "5분 전" },
    { id: 2, message: "좋아요를 받았습니다", time: "1시간 전" },
    { id: 3, message: "팔로우 요청이 있습니다", time: "2시간 전" },
  ];

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-yellow-800">알림</h3>
      <div className="mt-2 space-y-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="text-yellow-700">
            <div className="text-sm">{notification.message}</div>
            <div className="text-xs text-yellow-600">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function Analytics() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const analytics = {
    pageViews: 1234,
    uniqueVisitors: 567,
    bounceRate: "45%",
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-purple-800">분석 데이터</h3>
      <div className="mt-2 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700">
            {analytics.pageViews}
          </div>
          <div className="text-sm text-purple-600">페이지 뷰</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700">
            {analytics.uniqueVisitors}
          </div>
          <div className="text-sm text-purple-600">고유 방문자</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700">
            {analytics.bounceRate}
          </div>
          <div className="text-sm text-purple-600">이탈률</div>
        </div>
      </div>
    </div>
  );
}

function LoadingCard({ title }: { title: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
        <span className="text-gray-600">{title}</span>
      </div>
    </div>
  );
}

export default function ParallelSuspensePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            병렬 Suspense Streaming 테스트
          </h1>
          <p className="text-gray-600">
            이 페이지는 여러 컴포넌트가 동시에 로드되는 병렬 streaming을
            테스트합니다. 각 컴포넌트가 독립적으로 로드되는 것을 확인해보세요.
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 mt-4">
            <p className="text-green-800 text-sm">
              <strong>🚀 성능 개선:</strong> 순차적 스트리밍과 달리, 이
              페이지에서는 3개 컴포넌트가 동시에 로드됩니다. 각각 1초, 1.2초,
              1.5초 후에 준비되는 대로 표시되어 전체 로딩 시간이 단축됩니다.
            </p>
          </div>
          <div className="mt-4 space-x-4">
            <Link
              href="/test/suspense"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← 순차적 Streaming 테스트
            </Link>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 첫 번째 행 */}
          <Suspense fallback={<LoadingCard title="사용자 프로필 로딩 중..." />}>
            <UserProfile />
          </Suspense>

          <Suspense fallback={<LoadingCard title="알림 로딩 중..." />}>
            <Notifications />
          </Suspense>

          {/* 두 번째 행 */}
          <Suspense fallback={<LoadingCard title="최근 게시글 로딩 중..." />}>
            <RecentPosts />
          </Suspense>

          <Suspense fallback={<LoadingCard title="분석 데이터 로딩 중..." />}>
            <Analytics />
          </Suspense>
        </div>

        {/* 설명 섹션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            병렬 Streaming의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">장점</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>독립적 로딩:</strong> 각 컴포넌트가 독립적으로
                  로드됩니다
                </li>
                <li>
                  • <strong>병렬 처리:</strong> 여러 데이터를 동시에 가져옵니다
                </li>
                <li>
                  • <strong>부분적 표시:</strong> 준비된 컴포넌트부터 먼저
                  표시됩니다
                </li>
                <li>
                  • <strong>에러 격리:</strong> 한 컴포넌트의 에러가 다른
                  컴포넌트에 영향을 주지 않습니다
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                로딩 순서
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs">
                    1
                  </div>
                  <span>알림 (0.8초)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
                    2
                  </div>
                  <span>사용자 프로필 (1.0초)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                    3
                  </div>
                  <span>최근 게시글 (1.2초)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">
                    4
                  </div>
                  <span>분석 데이터 (1.5초)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
