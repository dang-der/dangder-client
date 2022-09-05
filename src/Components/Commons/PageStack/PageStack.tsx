import { ReactNode, useEffect, useRef, useState } from "react";

interface PageStackProps {
  children: ReactNode[];
  controller: any;
}
export default function PageStack({ children, controller }: PageStackProps) {
  const sizeRef = useRef(children.length - 1);
  const pageIndexRef = useRef(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(
    pageIndexRef.current
  );

  useEffect(() => {
    controller.current.next = nextPage;
    controller.current.prev = prevPage;
  }, []);

  const nextPage = () => {
    if (pageIndexRef.current >= sizeRef.current) return;

    pageIndexRef.current += 1;
    setCurrentPageIndex((p) => p + 1);
  };

  const prevPage = () => {
    if (pageIndexRef.current <= 0) return;

    pageIndexRef.current -= 1;
    setCurrentPageIndex((p) => p - 1);
  };

  return <>{children?.[currentPageIndex]}</>;
}
