import styled from "@emotion/styled";
import Slider from "react-slick";
import { MainColor } from "../../../../styles/GlobalStyles";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    192.09deg,
    #304afe -3.78%,
    #40989e 38.59%,
    #70c647 64.03%,
    #fff500 105.85%
  );
  align-items: center;
  justify-content: center;
`;

export const LogoMainTitleWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoMainTitle = styled.img`
  width: 58%;
`;

export const LogoSubTitle = styled.div`
  margin-top: 0.6rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
`;

export const ButtonWrapper = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.div`
  cursor: pointer;
  padding: 0.4rem 6.5rem;
  border: 2px solid #ffffff;
  border-radius: 100px;
  margin: 1rem;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Nonmember = styled.div`
  border-bottom: 0.1rem solid #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  color: #ffffff;
  u {
    color: black;
    cursor: pointer;
  }
`;
