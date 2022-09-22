import styled from "@emotion/styled";
import { MainColor } from "../../../../../styles/GlobalStyles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainImageWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    width: 25%;
    position: absolute;
    z-index: 1;

    margin-bottom: 4rem;
  }
`;

export const MainImage = styled.img`
  width: 58%;
  margin-right: 1rem;
  margin-bottom: 5.2rem;
  z-index: 2;
`;

export const SubTitle = styled.div`
  margin-top: 0.6rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
`;

export const ButtonWrapper = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.div`
  cursor: pointer;
  padding: 0.4rem 6.5rem;
  border: 1px solid #ffffff;
  background-color: ${MainColor};
  border-radius: 100px;
  margin: 1rem;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
