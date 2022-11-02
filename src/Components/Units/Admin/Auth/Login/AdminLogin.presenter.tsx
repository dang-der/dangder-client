import "antd/dist/antd.css";
import { Form, Input } from "antd";
import Link from "next/link";
import * as S from "./AdminLogin.styles";

export default function AdminLoginUI(props: any) {
  return (
    <S.Wrapper>
      <S.LogoImage src="/logo.svg" />
      <S.FormTitle>Sign in</S.FormTitle>
      <S.FormWrapper>
        <S.LoginForm name="basic" autoComplete="off">
          <S.EmailWrapper>
            <Form.Item label="Email" name="email">
              <S.LoginInput
                type="text"
                placeholder="admin@gmail.com"
                style={{ width: "181.5px" }}
              />
            </Form.Item>
          </S.EmailWrapper>

          <S.PasswordWrapper>
            <Form.Item label="Password" name="password">
              <Input.Password type="password" placeholder="password" />
            </Form.Item>
          </S.PasswordWrapper>

          <Form.Item>
            <S.LoginButton
              type="primary"
              htmlType="submit"
              onClick={props.handleAdminLogin}
            >
              로그인
            </S.LoginButton>
          </Form.Item>
          <S.LoginFooter>
            <S.FooterSpan>관리자 계정이 없으신가요?</S.FooterSpan>
            <Link href="/admin/signup">
              <a>
                <S.MovetoJoinButton>회원가입</S.MovetoJoinButton>
              </a>
            </Link>
          </S.LoginFooter>
        </S.LoginForm>
      </S.FormWrapper>
    </S.Wrapper>
  );
}
