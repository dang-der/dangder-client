import styled from "@emotion/styled";
import { Form, Button, Input } from "antd";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoImage = styled.img`
  margin-bottom: 2rem;
`;

export const FormTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 400px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.15);
`;

export const LoginForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EmailWrapper = styled.div`
  margin-left: 1.2rem;
`;

export const PasswordWrapper = styled.div``;

export const LoginInput = styled(Input)`
  width: 181.5px;
`;

export const LoginButton = styled(Button)`
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginFooter = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const FooterSpan = styled.span`
  color: #71717b;
  font-weight: 600;
`;

export const MovetoJoinButton = styled(Button)`
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
