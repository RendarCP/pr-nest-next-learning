export default function TestModalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            테스트 모달 페이지
          </h1>
          <p className="text-gray-600">
            이 페이지는 Intercepting Routes 테스트를 위한 간단한 페이지입니다.
          </p>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">
              이 페이지가 모달로 표시되면 Intercepting Routes가 정상적으로
              작동하는 것입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
