export default function TestModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">테스트 모달</h2>
          <div className="bg-green-500 text-white px-2 py-1 text-xs rounded">
            MODAL
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          이것은 Intercepting Routes를 통한 모달입니다!
        </p>
        <div className="bg-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            ✅ Intercepting Routes가 정상적으로 작동하고 있습니다!
          </p>
        </div>
      </div>
    </div>
  );
}
