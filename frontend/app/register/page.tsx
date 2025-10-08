"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/auth/validation";
import { registerWithFormData } from "@/lib/actions/auth";
import { useState } from "react";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await registerWithFormData(data);
    } catch (error) {
      setError("root", {
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                id="name"
                type="text"
                label="이름"
                placeholder="이름을 입력하세요"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>

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
                placeholder="비밀번호를 입력하세요 (최소 6자)"
                {...register("password")}
                error={errors.password?.message}
              />
            </div>

            <div>
              <Input
                id="confirmPassword"
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력하세요"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          <Input
            id="agree-terms"
            type="checkbox"
            label={
              <>
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  이용약관
                </a>
                에 동의합니다
              </>
            }
            {...register("agreeTerms")}
            error={errors.agreeTerms?.message}
          />

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
              {isSubmitting ? "회원가입 중..." : "회원가입"}
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
