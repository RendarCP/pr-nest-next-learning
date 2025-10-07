"use client";

import { usePathname } from "next/navigation";

export function DebugInfo() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div>
        <strong>현재 경로:</strong> {pathname}
      </div>
      <div className="mt-2">
        <strong>모달 슬롯:</strong>{" "}
        {pathname.includes("/posts/") ? "활성화" : "비활성화"}
      </div>
    </div>
  );
}
