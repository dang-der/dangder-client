import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";


const pages = [
  {
    path: "/auth/password-reset",
    title: "비밀번호 재설정",
  },
  {
    path: "/auth/signup",
    title: "회원가입",
  },
  {
    path: "/today",
    title: "오늘의 댕댕이",
  },
  {
    path: "/chat",
    title: "메세지",
  },
  {
    path: "/profile",
    title: "마이 댕댕이",
  },
  {
    path: "/profile/edit",
    title: "마이 댕댕이 수정하기",
  },
  {
    path: "/profile/init",
    title: "댕댕이 프로필",
  },
  {
    path: "/settings",
    title: "설정",
  },
  {
    path: "/profile/[dogId]",
    title: "마이 댕댕이",
  },
];

export default function PageHeader() {
  const router = useRouter();
  const pageTitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pageTitleRef.current) return;

    if (router.pathname === "/interests/chat/[roomId]") {
      pageTitleRef.current.innerText = String(router.query.interest) || "";
      return;
    }
    const i = pages.findIndex((e) => e.path === router.pathname);

    if (i === -1) {
      pageTitleRef.current.innerText = "";
      return;
    }

    pageTitleRef.current.innerText = pages[i].title;
  }, [router.pathname]);

  const onClickBackArrow = () => {
    if (router.pathname === "/chat/[roomId]") {
      router.replace("/chat");
      return;
    }

    router.back();
  };

  return (
    <Wrapper>
      <ArrowBackIcon onClick={onClickBackArrow} style={{ cursor: "pointer" }} />
      <span
        ref={pageTitleRef}
        style={{ fontSize: "1.5rem", fontWeight: "700", marginLeft: "1rem" }}
      ></span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 3.1rem;
  padding: 2.5rem;
`;
