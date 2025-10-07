"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅
    console.error("Suspense Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            컴포넌트 로딩 에러
          </h1>
          <p className="text-red-700 mb-4">
            서버 컴포넌트에서 에러가 발생했습니다. 이는 의도된 에러
            테스트입니다.
          </p>

          <div className="bg-red-100 border border-red-300 rounded p-4 mb-4">
            <h3 className="font-semibold text-red-800 mb-2">에러 정보:</h3>
            <p className="text-sm text-red-700 font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={reset}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
            <Link
              href="/suspense"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              순차적 Streaming 테스트로 돌아가기
            </Link>
            <Link
              href="/"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
