import { Suspense } from "react";
import Link from "next/link";
import {
  Skeleton,
  SkeletonCard,
  SkeletonList,
  SkeletonStats,
} from "@/components/Skeleton";

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

// 기존 로딩 스피너 (비교용)
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

// 스켈레톤 로딩 카드
function SkeletonLoadingCard({ title }: { title: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="skeleton-gradient bg-gray-100 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-16 bg-gray-200 rounded mb-3"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">{title}</div>
    </div>
  );
}

export default function SkeletonTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            스켈레톤 UI 테스트
          </h1>
          <p className="text-gray-600">
            이 페이지는 다양한 스켈레톤 UI 패턴을 테스트합니다. 기존 스피너와
            스켈레톤 UI의 차이점을 확인해보세요.
          </p>
          <div className="bg-purple-100 border border-purple-200 rounded-lg p-4 mt-4">
            <p className="text-purple-800 text-sm">
              <strong>🎨 UX 개선:</strong> 스켈레톤 UI는 단순한 스피너보다 훨씬
              자연스러운 로딩 경험을 제공합니다. 사용자는 콘텐츠의 구조를 미리
              파악할 수 있어 심리적 대기 시간이 줄어듭니다.
            </p>
          </div>
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

        {/* 즉시 로드되는 컴포넌트 */}
        <QuickInfo />

        {/* 기존 스피너 vs 스켈레톤 비교 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              기존 스피너 방식
            </h2>
            <Suspense
              fallback={<LoadingSpinner message="사용자 통계 로딩 중..." />}
            >
              <UserStats />
            </Suspense>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              스켈레톤 UI 방식
            </h2>
            <Suspense
              fallback={<SkeletonLoadingCard title="사용자 통계 로딩 중..." />}
            >
              <UserStats />
            </Suspense>
          </div>
        </div>

        {/* 다양한 스켈레톤 패턴 테스트 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            다양한 스켈레톤 패턴
          </h2>

          {/* 스켈레톤 카드 */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              스켈레톤 카드
            </h3>
            <Suspense fallback={<SkeletonCard />}>
              <SlowData />
            </Suspense>
          </div>

          {/* 스켈레톤 통계 */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              스켈레톤 통계
            </h3>
            <Suspense fallback={<SkeletonStats />}>
              <UserStats />
            </Suspense>
          </div>

          {/* 스켈레톤 리스트 */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              스켈레톤 리스트
            </h3>
            <Suspense fallback={<SkeletonList />}>
              <VerySlowData />
            </Suspense>
          </div>
        </div>

        {/* 설명 섹션 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            스켈레톤 UI의 장점
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                사용자 경험
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>콘텐츠 예측:</strong> 어떤 콘텐츠가 로드될지 미리
                  보여줍니다
                </li>
                <li>
                  • <strong>자연스러운 전환:</strong> 로딩 → 실제 콘텐츠 전환이
                  부드럽습니다
                </li>
                <li>
                  • <strong>시각적 피드백:</strong> 다양한 애니메이션으로 로딩
                  상태를 표시합니다
                </li>
                <li>
                  • <strong>인지 부하 감소:</strong> 사용자가 기다리는 시간을 덜
                  느끼게 합니다
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                기술적 장점
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>재사용성:</strong> 컴포넌트 라이브러리로 어디서든
                  사용 가능
                </li>
                <li>
                  • <strong>성능:</strong> CSS 애니메이션으로 부드러운 효과
                </li>
                <li>
                  • <strong>접근성:</strong> 스크린 리더 친화적
                </li>
                <li>
                  • <strong>반응형:</strong> 모든 디바이스에서 최적화
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
