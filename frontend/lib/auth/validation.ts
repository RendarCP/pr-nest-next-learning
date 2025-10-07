export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateEmail(email: string): ValidationError | null {
  if (!email) {
    return { field: "email", message: "이메일을 입력해주세요." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: "email", message: "올바른 이메일 형식을 입력해주세요." };
  }

  return null;
}

export function validatePassword(password: string): ValidationError | null {
  if (!password) {
    return { field: "password", message: "비밀번호를 입력해주세요." };
  }

  if (password.length < 6) {
    return {
      field: "password",
      message: "비밀번호는 최소 6자 이상이어야 합니다.",
    };
  }

  return null;
}

export function validateName(name: string): ValidationError | null {
  if (!name) {
    return { field: "name", message: "이름을 입력해주세요." };
  }

  if (name.length < 2) {
    return { field: "name", message: "이름은 최소 2자 이상이어야 합니다." };
  }

  return null;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationError | null {
  if (!confirmPassword) {
    return {
      field: "confirmPassword",
      message: "비밀번호 확인을 입력해주세요.",
    };
  }

  if (password !== confirmPassword) {
    return {
      field: "confirmPassword",
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  return null;
}

export function validateLoginForm(
  email: string,
  password: string
): ValidationResult {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateRegisterForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult {
  const errors: ValidationError[] = [];

  const nameError = validateName(name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  const confirmPasswordError = validateConfirmPassword(
    password,
    confirmPassword
  );
  if (confirmPasswordError) errors.push(confirmPasswordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
}
