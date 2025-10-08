import { z } from "zod";

// 로그인 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("유효한 이메일 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
  rememberMe: z.boolean().optional(),
});

// 회원가입 스키마
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 최소 2자 이상이어야 합니다")
      .max(50, "이름은 최대 50자까지 입력 가능합니다")
      .regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글, 영문, 공백만 입력 가능합니다"),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("유효한 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
      .max(100, "비밀번호는 최대 100자까지 입력 가능합니다")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        "비밀번호는 영문과 숫자를 포함해야 합니다"
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, "이용약관에 동의해야 합니다"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 타입 추출
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
