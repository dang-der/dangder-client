import * as S from "./Login.styles";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
      "이메일 아이디를 @까지 정확하게 입력해 주세요.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .matches(/[^A-Za-z0-9$]/gi, "영문+숫자 조합 비밀번호를 입력해 주세요.")
    .required("비밀번호를 입력해주세요"),
});

interface LoginUIProps{
  handleUserLogin : (inputs :any) =>void
}

export default function LoginUI({handleUserLogin} : LoginUIProps) {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickLogin = (inputs : any) =>{
    handleUserLogin(inputs)
  }
 

  const onClickSignUp = () => {
    router.push("/auth/signup");
  };

  const onClickResetPassword = () => {
    router.push("/auth/password-reset");
  };

  const onClickNonmember = () => {
    router.push("/");
  };

  return (
    <S.Wrapper onSubmit={handleSubmit(onClickLogin)}>
      <S.LogoImage src="/logo.svg" />

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

      <S.JoinWrapper>
        <u onClick={onClickNonmember}>비회원으로 둘러보기🐾</u>
      </S.JoinWrapper>
    </S.Wrapper>
  );
}
