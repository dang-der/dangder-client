import "antd/dist/antd.css";
import { Form, Modal } from "antd";
import Link from "next/link";
import * as S from "./AdminLogin.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationAdminLoginArgs,
} from "../../../../../Commons/Types/Generated/types";
import { ADMIN_LOGIN } from "./AdminLogin.quries";
import { useRecoilState } from "recoil";
import { adminAccessTokenState } from "../../../../../Commons/Store/Admin/AccessToken";
import { useRouter } from "next/router";

const schema = yup.object({
  account: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{3,10}$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함하여 10자리 이내로 입력해주세요."
    )
    .required("비밀번호를 입력해주세요."),
});

interface ILoginInputType {
  account: string;
  password: string;
}

export default function AdminLoginUI() {
  const { register, handleSubmit, formState } = useForm<ILoginInputType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [adminLogin] = useMutation<
    Pick<IMutation, "adminLogin">,
    IMutationAdminLoginArgs
  >(ADMIN_LOGIN);

  const router = useRouter();

  const [, setAdminAccessToken] = useRecoilState(adminAccessTokenState);

  const handleAdminLogin = async (inputs: any) => {
    try {
      const result = await adminLogin({
        variables: { ...inputs },
      });

      const accessToken = result.data?.adminLogin || "";

      if (!accessToken) {
        Modal.error({
          content: "로그인에 실패하였습니다. 다시 시도해 주세요.",
        });
      }

      setAdminAccessToken(accessToken);
      router.push("/admin/users");
    } catch (e) {
      if (e instanceof Error) {
        Modal.error({ content: e.message });
      }
    }
  };

  return (
    <S.Wrapper>
      <S.LogoImage src="/logo.svg" />
      <S.FormTitle>Sign in</S.FormTitle>
      <S.FormWrapper>
        <S.LoginForm onSubmit={handleSubmit(handleAdminLogin)}>
          <S.InputWrapper>
            <S.EmailWrapper>
              <Form.Item label="Account" name="account">
                <S.AccountInput
                  type="text"
                  placeholder="admin@gmail.com"
                  {...register("account")}
                />
              </Form.Item>
            </S.EmailWrapper>
            <S.InputErrors>{formState.errors.account?.message}</S.InputErrors>

            <S.PasswordWrapper>
              <Form.Item label="Password" name="password">
                <S.PasswordInput
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
              </Form.Item>
            </S.PasswordWrapper>
            <S.InputErrors>{formState.errors.password?.message}</S.InputErrors>
          </S.InputWrapper>

          <Form.Item>
            <S.LoginButton type="primary" htmlType="submit">
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
