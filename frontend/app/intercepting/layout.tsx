import { ReactNode } from "react";
import { DebugInfo } from "./debug-info";

interface InterceptingLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function InterceptingLayout({
  children,
  modal,
}: InterceptingLayoutProps) {
  console.log("InterceptingLayout - modal:", modal ? "있음" : "없음");

  return (
    <>
      {children}
      {modal}
      <DebugInfo />
    </>
  );
}
