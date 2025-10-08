"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/auth/validation";
import { loginWithFormData } from "@/lib/actions/auth";
import { useState } from "react";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  console.log("formState", errors);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await loginWithFormData(data);
    } catch (error) {
      setError("root", {
        message: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              새 계정 만들기
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                id="email"
                type="email"
                label="이메일"
                placeholder="이메일을 입력하세요"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div>
              <Input
                id="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Input
              id="remember-me"
              type="checkbox"
              label="로그인 상태 유지"
              {...register("rememberMe")}
            />

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>

          {errors.root && (
            <div className="text-red-600 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
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
