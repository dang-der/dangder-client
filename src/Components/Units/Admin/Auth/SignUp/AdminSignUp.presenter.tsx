import "antd/dist/antd.css";
import { Form, Input } from "antd";
import Link from "next/link";
import * as S from "./AdminSignUp.styles";

export default function AdminSignUpUI() {
  return (
    <S.Wrapper>
      <S.LogoImage src="/logo.svg" />
      <S.FormTitle>Sign up</S.FormTitle>
      <S.FormWrapper>
        <S.LoginForm name="basic" autoComplete="off">
          <S.EmailWrapper>
            <Form.Item label="Email" name="email">
              <Input placeholder="admin@gmail.com" />
            </Form.Item>
          </S.EmailWrapper>

          <S.PasswordWrapper>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="password" />
            </Form.Item>
          </S.PasswordWrapper>

          <S.RePasswordWrapper>
            <Form.Item label="Confrim Password" name="RePassword">
              <Input.Password placeholder="confirm password" />
            </Form.Item>
          </S.RePasswordWrapper>

          <Form.Item>
            <S.SignupButton type="primary" htmlType="submit">
              회원가입
            </S.SignupButton>
          </Form.Item>
        </S.LoginForm>
        <S.LoginFooter>
          <S.FooterSpan>이미 계정이 있으신가요?</S.FooterSpan>
          <Link href="/admin">
            <a>
              <S.MovetoJoinSpan>로그인</S.MovetoJoinSpan>
            </a>
          </Link>
        </S.LoginFooter>
      </S.FormWrapper>
    </S.Wrapper>
  );
}
