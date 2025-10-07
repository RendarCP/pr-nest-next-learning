import { Suspense } from "react";
import Link from "next/link";

// 빠르게 로드되는 컴포넌트 (즉시 렌더링)
function QuickInfo() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-green-800">
        즉시 로드되는 정보
      </h3>
      <p className="text-green-700">이 정보는 서버에서 즉시 렌더링됩니다.</p>
      <p className="text-sm text-green-600 mt-2">로딩 시간: 0ms</p>
    </div>
  );
}

// 느리게 로드되는 컴포넌트 (2초 지연)
async function SlowData() {
  // 2초 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = {
    title: "느린 데이터",
    content: "이 데이터는 2초 후에 로드됩니다.",
    timestamp: new Date().toLocaleTimeString(),
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800">{data.title}</h3>
      <p className="text-blue-700">{data.content}</p>
      <p className="text-sm text-blue-600 mt-2">로딩 완료: {data.timestamp}</p>
    </div>
  );
}

// 더 느리게 로드되는 컴포넌트 (3초 지연)
async function VerySlowData() {
  // 3초 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = {
    title: "매우 느린 데이터",
    content: "이 데이터는 3초 후에 로드됩니다.",
    timestamp: new Date().toLocaleTimeString(),
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-purple-800">{data.title}</h3>
      <p className="text-purple-700">{data.content}</p>
      <p className="text-sm text-purple-600 mt-2">
        로딩 완료: {data.timestamp}
      </p>
    </div>
  );
}

// 사용자 통계 컴포넌트 (1.5초 지연)
async function UserStats() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const stats = {
    totalUsers: 1234,
    activeUsers: 567,
    newUsers: 89,
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-yellow-800">사용자 통계</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-700">
            {stats.totalUsers}
          </div>
          <div className="text-sm text-yellow-600">총 사용자</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-700">
            {stats.activeUsers}
          </div>
          <div className="text-sm text-yellow-600">활성 사용자</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-700">
            {stats.newUsers}
          </div>
          <div className="text-sm text-yellow-600">신규 사용자</div>
        </div>
      </div>
    </div>
  );
}

// 로딩 스피너 컴포넌트
function LoadingSpinner({ message }: { message: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
}

export default function SuspenseTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Suspense Streaming 테스트
          </h1>
          <p className="text-gray-600">
            이 페이지는 React Server Components의 Suspense streaming을
            테스트합니다. 각 컴포넌트가 다른 시간에 로드되는 것을 확인해보세요.
          </p>
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 text-sm">
              <strong>💡 학습 포인트:</strong> 이 페이지에서는 순차적 스트리밍을
              확인할 수 있습니다. 즉시 로드되는 정보 → 2초 후 느린 데이터 → 3초
              후 매우 느린 데이터 순서로 표시됩니다.
            </p>
          </div>
          <div className="mt-4">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>

        {/* 즉시 로드되는 컴포넌트 */}
        <QuickInfo />

        {/* 1.5초 후 로드되는 사용자 통계 */}
        <Suspense
          fallback={<LoadingSpinner message="사용자 통계 로딩 중..." />}
        >
          <UserStats />
        </Suspense>

        {/* 2초 후 로드되는 느린 데이터 */}
        <Suspense
          fallback={<LoadingSpinner message="느린 데이터 로딩 중..." />}
        >
          <SlowData />
        </Suspense>

        {/* 3초 후 로드되는 매우 느린 데이터 */}
        <Suspense
          fallback={<LoadingSpinner message="매우 느린 데이터 로딩 중..." />}
        >
          <VerySlowData />
        </Suspense>

        {/* 추가 정보 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Streaming 동작 원리
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <strong>즉시 로드:</strong> QuickInfo 컴포넌트는 지연 없이 바로
                표시됩니다.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <strong>1.5초 후:</strong> UserStats 컴포넌트가 로드되면서
                사용자 통계가 표시됩니다.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <strong>2초 후:</strong> SlowData 컴포넌트가 로드됩니다.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <strong>3초 후:</strong> VerySlowData 컴포넌트가 마지막으로
                로드됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
