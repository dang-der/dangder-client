import styled from "@emotion/styled";
import { Button, Form } from "antd";

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
  align-items: left;
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
  width: 300px;
`;

export const PasswordWrapper = styled.div`
  width: 300px;
`;

export const RePasswordWrapper = styled.div`
  width: 300px;
`;

export const SignupButton = styled(Button)`
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterSpan = styled.span`
  color: #71717b;
  font-weight: 600;
  margin-right: 4px;
`;

export const MovetoJoinSpan = styled.span`
  font-weight: 500;
  text-decoration: underline;
`;
