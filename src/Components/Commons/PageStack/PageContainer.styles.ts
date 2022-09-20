import styled from "@emotion/styled";
import { MainColor } from "../../../../styles/GlobalStyles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
`;

export const PageStackWrapper = styled.div`
  flex-grow: 10;
  width: 100%;
`;

export const NextButton = styled.button`
  width: 100%;
  border-radius: 6.25rem;
  height: 3.125rem;
  background-color: ${MainColor};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: none;
  flex-grow: 0.04;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 1.5rem;
    cursor: pointer;
  }

  span {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
