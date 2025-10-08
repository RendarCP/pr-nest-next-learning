"use server";

import { redirect } from "next/navigation";
import { login, register } from "@/lib/api/auth";
import { validateLoginForm, validateRegisterForm } from "@/lib/auth/validation";
import {
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/auth/validation";

export async function loginAction(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 클라이언트 사이드 검증
  const validation = validateLoginForm(email, password);
  if (!validation.isValid) {
    throw new Error("입력 데이터가 올바르지 않습니다.");
  }

  try {
    // 백엔드 API 호출
    const authData = await login({ email, password });
    console.log("authData", authData);

    // 성공 시 홈페이지로 리다이렉트
    redirect("/");
  } catch (error: any) {
    // redirect 에러는 정상적인 리다이렉트이므로 무시하고 다시 던지기
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Login error:", error);

    // 다른 에러들은 다시 던지기
    throw error;
  }
}

export async function registerAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // 클라이언트 사이드 검증
  const validation = validateRegisterForm(
    name,
    email,
    password,
    confirmPassword
  );
  if (!validation.isValid) {
    throw new Error("입력 데이터가 올바르지 않습니다.");
  }

  try {
    // 백엔드 API 호출
    const authData = await register({ name, email, password });

    // 성공 시 홈페이지로 리다이렉트
    redirect("/");
  } catch (error: any) {
    // redirect 에러는 정상적인 리다이렉트이므로 무시하고 다시 던지기
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Register error:", error);

    // 다른 에러들은 다시 던지기
    throw error;
  }
}

// react-hook-form과 함께 사용할 새로운 actions
export async function loginWithFormData(data: LoginFormData): Promise<void> {
  try {
    // 백엔드 API 호출
    const authData = await login({
      email: data.email,
      password: data.password,
    });
    console.log("authData", authData);

    // 성공 시 홈페이지로 리다이렉트
    redirect("/");
  } catch (error: any) {
    // redirect 에러는 정상적인 리다이렉트이므로 무시하고 다시 던지기
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Login error:", error);

    // 다른 에러들은 다시 던지기
    throw error;
  }
}

export async function registerWithFormData(
  data: RegisterFormData
): Promise<void> {
  try {
    // 백엔드 API 호출
    const authData = await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    // 성공 시 홈페이지로 리다이렉트
    redirect("/");
  } catch (error: any) {
    // redirect 에러는 정상적인 리다이렉트이므로 무시하고 다시 던지기
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Register error:", error);

    // 다른 에러들은 다시 던지기
    throw error;
  }
}
