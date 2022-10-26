import styled from "@emotion/styled";
import { MainColor } from "../../../../../styles/GlobalStyles";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const LogoImage = styled.img`
  width: 80%;
  padding: 1rem;
  margin-bottom: 5rem;
`;

export const InputErrorWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  span {
    color: red;
    font-size: 0.75rem;
    padding-left: 1rem;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 3.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background-color: #fafafa;
  border-radius: 1rem;

  input {
    width: 90%;
    border: none;
    background-color: transparent;
  }
`;

export const LoginButton = styled.button`
  cursor: pointer;
  width: 80%;
  height: 4.5rem;
  border: none;
  border-radius: 100px;
  margin: 3rem 0;
  background-color: ${MainColor};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const JoinWrapper = styled.span`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #d9d9d9;
  u {
    color: black;
    cursor: pointer;
  }
`;
