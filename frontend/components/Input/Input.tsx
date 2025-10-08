import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, type, ...props }, ref) => {
    const inputId =
      id ||
      (typeof label === "string"
        ? label.toLowerCase().replace(/\s+/g, "-")
        : undefined);

    // 체크박스인 경우 다른 레이아웃 사용
    if (type === "checkbox") {
      return (
        <div className="w-full">
          <div className="flex items-center">
            <input
              id={inputId}
              ref={ref}
              type="checkbox"
              className={cn(
                "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded",
                error && "border-red-500 focus:ring-red-500",
                className
              )}
              {...props}
            />
            {label && (
              <label
                htmlFor={inputId}
                className="ml-2 block text-sm text-gray-900"
              >
                {label}
              </label>
            )}
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );
    }

    // 일반 입력 필드
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base",
            "text-gray-900 placeholder:text-gray-400",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
