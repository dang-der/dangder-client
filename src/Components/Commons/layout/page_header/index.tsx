import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";

export default function PageHeader() {
  const pageTitleRef = useRef<HTMLTitleElement>(null);

  const [title, setTitle] = useState("");

  useEffect((title) => {
    if (pageTitleRef && pageTitleRef.current) {
      pageTitle(title);
      pageTitleRef.current.innerText = title;
    }
  }, []);

  const pageTitle = (title: string) => {
    setTitle(title);
  };

  return (
    <Wrapper>
      <ArrowBackIcon />
      <PageTitle ref={pageTitleRef}>{title}</PageTitle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100vw;
  height: 3.1rem;
  padding: 2.5rem;
`;

const PageTitle = styled.title`
  font-size: 2rem;
  font-weight: 700;
`;
