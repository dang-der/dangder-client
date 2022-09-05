import { ReactNode } from "react";

interface PageProps {
  children: ReactNode[] | ReactNode;
}

// todo : 모션 적용하기
export default function Page({ children }: PageProps) {
  return <div style={{ width: "100%", height: "100%" }}>{children}</div>;
}
