import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
`;

export const PageStackWrapper = styled.div`
  flex-grow: 10;
  width: 100%;
`;

interface NextButtonStyleProps {
  isActive: boolean;
}
export const NextButton = styled.button`
  width: 100%;
  border-radius: 6.25rem;
  height: 4.5rem;
  background-color: ${(props: NextButtonStyleProps) =>
    props.isActive ? "#304ffe" : "gray"};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: none;
  flex-grow: 0.04;
`;
