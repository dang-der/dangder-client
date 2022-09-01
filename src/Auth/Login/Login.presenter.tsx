import * as S from "./Login.styles";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("이메일을 입력해주세요."),
  password: yup
    .string()
    .min(4, "비밀번호는 4자리 이상이어야 합니다.")
    .max(10, "비밀번호는 10자리 이하여야 합니다.")
    .required("비밀번호를 입력해주세요"),
});

export default function LoginUI() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickLogin = (inputs: any) => {
    console.log("onClickLogin", inputs);
  };

  const onClickSignUp = () => {
    router.push("/auth/signup");
  };

  const onClickResetPassword = () => {
    router.push("/auth/password-reset");
  };
  return (
    <S.Wrapper onSubmit={handleSubmit(onClickLogin)}>
      <S.LogoImage src="/logo.png" />

      <S.InputErrorWrapper>
        <S.InputWrapper>
          <EmailRoundedIcon />
          <input type="email" {...register("email")} />
        </S.InputWrapper>
        <span>{formState.errors.email?.message}</span>
      </S.InputErrorWrapper>

      <S.InputErrorWrapper>
        <S.InputWrapper>
          <HttpsRoundedIcon />
          <input type="password" {...register("password")} />
        </S.InputWrapper>
        <span>{formState.errors.password?.message}</span>
      </S.InputErrorWrapper>

      <S.LoginButton>로그인</S.LoginButton>

      <S.JoinWrapper>
        아직 계정이 없으신가요? <u onClick={onClickSignUp}>회원가입</u>
      </S.JoinWrapper>

      <S.JoinWrapper>
        비밀번호를 잊으셨나요?{" "}
        <u onClick={onClickResetPassword}>비밀번호 재설정</u>
      </S.JoinWrapper>
    </S.Wrapper>
  );
}
