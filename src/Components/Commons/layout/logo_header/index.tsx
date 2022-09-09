import styled from "@emotion/styled";

export default function LogoHeader() {
  return (
    <Wrapper>
      <Logo src="/logo.svg" />
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
