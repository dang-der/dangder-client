import { useRouter } from "next/router";
import { ReactNode } from "react";
import LogoHeader from "./logo_header";
import Navigation from "./navigation";
import PageHeader from "./page_header";

const SHOW_LOGO_HEADERS = ["/", "/[dogId]"];

// TODO: 채팅방 - 약속 설정에 페이지 타이틀 헤더 추가
const SHOW_PAGE_HEADERS = [
  "/auth/password-reset",
  "/auth/signup",
  "/today",
  "/chat/[roomId]",
  "/chat",
  "/profile",
  "/profile/edit",
  "/profile/init",
  "/settings",
];

const SHOW_NAVIGATION = ["/", "/[dogId]", "/today", "/chat", "/profile"];

interface ILayoutProps {
  children: ReactNode;
}

// TODO: 불필요한 리렌더링 막기
export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isShowLogoHeader = SHOW_LOGO_HEADERS.includes(router.pathname);
  const isShowPageHeader = SHOW_PAGE_HEADERS.includes(router.pathname);
  const isShowNavigation = SHOW_NAVIGATION.includes(router.pathname);

  return (
    <>
      {isShowLogoHeader && <LogoHeader />}
      {isShowPageHeader && <PageHeader />}
      <div>{props.children}</div>
      {isShowNavigation && <Navigation />}
    </>
  );
}
