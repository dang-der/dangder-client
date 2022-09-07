import { ReactNode } from "react";

interface PageStackProps {
  children: ReactNode[];
  currentPageIndex: number;
}
export default function PageStack({
  children,
  currentPageIndex,
}: PageStackProps) {
  return <>{children[currentPageIndex]}</>;
}
