import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              기존 계정으로 로그인
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" action={registerAction}>
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              label="이름"
              placeholder="이름을 입력하세요"
              required
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="이메일"
              placeholder="이메일을 입력하세요"
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              required
              minLength={6}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              required
            />
            <label
              htmlFor="agree-terms"
              className="ml-2 block text-sm text-gray-900"
            >
              <a href="#" className="text-primary-600 hover:text-primary-500">
                이용약관
              </a>
              에 동의합니다
            </label>
          </div>

          <div>
            <Button type="submit" className="w-full" size="lg">
              회원가입
            </Button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
