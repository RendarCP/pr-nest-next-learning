import { Suspense } from "react";
import Link from "next/link";

// 정상적으로 로드되는 컴포넌트
async function NormalComponent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-green-800">정상 컴포넌트</h3>
      <p className="text-green-700">이 컴포넌트는 정상적으로 로드됩니다.</p>
    </div>
  );
}

// 에러를 발생시키는 컴포넌트 (try-catch로 감싸기)
async function ErrorComponent() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 의도적으로 에러 발생
    throw new Error("이 컴포넌트는 에러를 발생시킵니다.");
  } catch (error) {
    // 에러를 컴포넌트로 반환하여 페이지가 깨지지 않도록 함
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800">에러 발생</h3>
        <p className="text-red-700">컴포넌트 로딩 중 에러가 발생했습니다:</p>
        <p className="text-sm text-red-600 mt-2 font-mono">
          {error instanceof Error ? error.message : "알 수 없는 에러"}
        </p>
      </div>
    );
  }
}

// 또 다른 정상 컴포넌트
async function AnotherNormalComponent() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-blue-800">
        또 다른 정상 컴포넌트
      </h3>
      <p className="text-blue-700">이 컴포넌트도 정상적으로 로드됩니다.</p>
    </div>
  );
}

// 에러 바운더리 컴포넌트
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-red-800">에러 발생</h3>
      <p className="text-red-700">컴포넌트 로딩 중 에러가 발생했습니다:</p>
      <p className="text-sm text-red-600 mt-2 font-mono">{error.message}</p>
    </div>
  );
}

// 에러가 발생할 수 있는 컴포넌트를 감싸는 래퍼
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingCard title="로딩 중..." />}>
      {children}
    </Suspense>
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

export default function ErrorSuspensePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            에러 처리 Suspense 테스트
          </h1>
          <p className="text-gray-600">
            이 페이지는 Suspense에서 에러가 발생했을 때의 동작을 테스트합니다.
            에러가 발생해도 다른 컴포넌트들은 정상적으로 로드됩니다.
          </p>
          <div className="mt-4 space-x-4">
            <Link
              href="/suspense"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← 순차적 Streaming 테스트
            </Link>
            <Link
              href="/suspense/parallel"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              병렬 Streaming 테스트
            </Link>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* 정상적으로 로드되는 컴포넌트 */}
          <Suspense fallback={<LoadingCard title="정상 컴포넌트 로딩 중..." />}>
            <NormalComponent />
          </Suspense>

          {/* 에러가 발생하는 컴포넌트 - try-catch로 감싸기 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              에러가 발생하는 컴포넌트
            </h2>
            <ErrorBoundary>
              <ErrorComponent />
            </ErrorBoundary>
          </div>

          {/* 또 다른 정상 컴포넌트 */}
          <Suspense
            fallback={<LoadingCard title="또 다른 정상 컴포넌트 로딩 중..." />}
          >
            <AnotherNormalComponent />
          </Suspense>
        </div>

        {/* 설명 섹션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            에러 처리의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                에러 격리
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>독립적 에러:</strong> 한 컴포넌트의 에러가 다른
                  컴포넌트에 영향을 주지 않습니다
                </li>
                <li>
                  • <strong>부분적 렌더링:</strong> 에러가 발생한 컴포넌트만
                  실패하고 나머지는 정상 로드됩니다
                </li>
                <li>
                  • <strong>사용자 경험:</strong> 전체 페이지가 망가지지 않고
                  부분적으로만 에러가 표시됩니다
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                로딩 순서
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>정상 컴포넌트 (1초)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">
                    ✗
                  </div>
                  <span>에러 컴포넌트 (1.5초) - 실패</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>또 다른 정상 컴포넌트 (2초)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
