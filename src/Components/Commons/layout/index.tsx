import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import LogoHeader from "./logo_header";
import Navigation from "./navigation";
import PageHeader from "./page_header";

const SHOW_LOGO_HEADERS = ["/", `/[dogId]`];

// TODO: 채팅방 - 약속 설정에 페이지 타이틀 헤더 추가
const SHOW_PAGE_HEADERS = [
  "/auth/password-reset",
  "/today",
  "/chat/[roomId]",
  "/chat",
  "/profile",
  "/profile/edit",
  "/settings",
  "/profile/[dogId]",
];

const SHOW_NAVIGATION = [
  "/",
  `/[dogId]`,
  "/today",
  "/chat",
  "/profile",
  "/profile/[dogId]",
];

interface ILayoutProps {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  height: 4.5rem;
`;

const ContentsWrapper = styled.div`
  flex-grow: 1;
  margin: 0 0.5rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`;

const TabWrapper = styled.div`
  height: 4rem;
`;

// TODO: 불필요한 리렌더링 막기
export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  console.log("Layout", router);
  const isShowLogoHeader = SHOW_LOGO_HEADERS.includes(router.pathname);
  const isShowPageHeader = SHOW_PAGE_HEADERS.includes(router.pathname);
  const isShowNavigation = SHOW_NAVIGATION.includes(router.pathname);

  return (
    <Wrapper>
      {(isShowLogoHeader || isShowPageHeader) && (
        <HeaderWrapper>
          {isShowLogoHeader && <LogoHeader />}
          {isShowPageHeader && <PageHeader />}
        </HeaderWrapper>
      )}

      <ContentsWrapper>{props.children}</ContentsWrapper>
      {isShowNavigation && (
        <TabWrapper>
          <Navigation />
        </TabWrapper>
      )}
    </Wrapper>
  );
}
