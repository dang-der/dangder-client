import styled from "@emotion/styled";
import Link from "next/link";

export default function LogoHeader() {
  return (
    <Wrapper>
      <Link href="/">
        <Logo src="/logo.svg" />
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.1rem;
  padding: 2.5rem 2.5rem 1.25rem 2.5rem;
`;

const Logo = styled.img`
  width: 9.875rem;
`;
