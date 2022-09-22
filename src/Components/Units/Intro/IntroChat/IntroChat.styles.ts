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
  height: 58.5%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* margin-bottom: 15rem; */
  /* margin-top: 1rem; */
`;

export const MainImage = styled.img`
  width: 100%;
  margin-right: 1rem;
`;

export const SubTitle = styled.span`
  margin-bottom: 5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
`;

export const ButtonWrapper = styled.span`
  /* margin-top: 4rem; */
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
