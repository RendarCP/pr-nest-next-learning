import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "pulse" | "gradient" | "wave";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "default",
  width,
  height,
  ...props
}: SkeletonProps) {
  const baseStyles = "bg-gray-200 rounded";

  const variants = {
    default: "animate-pulse",
    pulse:
      "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200",
    gradient:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-gradient-x",
    wave: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-wave",
  };

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
      {...props}
    />
  );
}

// 특화된 스켈레톤 컴포넌트들
export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Skeleton
          variant="gradient"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <Skeleton
            variant="gradient"
            width="60%"
            height={16}
            className="mb-2"
          />
          <Skeleton variant="gradient" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="gradient" width="100%" height={60} className="mb-3" />
      <div className="flex space-x-2">
        <Skeleton
          variant="gradient"
          width={60}
          height={24}
          className="rounded-full"
        />
        <Skeleton
          variant="gradient"
          width={80}
          height={24}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg"
        >
          <Skeleton
            variant="gradient"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1">
            <Skeleton
              variant="gradient"
              width="70%"
              height={16}
              className="mb-2"
            />
            <Skeleton variant="gradient" width="50%" height={12} />
          </div>
          <Skeleton variant="gradient" width={60} height={20} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-lg p-4 text-center"
        >
          <Skeleton
            variant="gradient"
            width={60}
            height={32}
            className="mx-auto mb-2"
          />
          <Skeleton
            variant="gradient"
            width="80%"
            height={14}
            className="mx-auto"
          />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <Skeleton variant="gradient" width="30%" height={20} />
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 flex items-center space-x-4">
            <Skeleton
              variant="gradient"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <Skeleton
                variant="gradient"
                width="60%"
                height={16}
                className="mb-2"
              />
              <Skeleton variant="gradient" width="40%" height={12} />
            </div>
            <Skeleton variant="gradient" width={80} height={24} />
          </div>
        ))}
      </div>
    </div>
  );
}
