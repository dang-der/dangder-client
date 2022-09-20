import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import * as S from "./Page.styles";
import LineInput from "../../../../Commons/LineInputs/LineInput";
import { useEffect } from "react";

export const emailSchema = yup.object({
  email: yup
    .string()
    .email("이메일 아이디를 @까지 정확하게 입력해 주세요.")
    .required("이메일을 입력해주세요."),
});

export default function EmailInputPage() {
  const [inputs, setSignUpInputs] = useRecoilState(signUpInputState);
  const { register, formState, reset } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!inputs.email) return;
    reset({ email: inputs.email });
  }, []);

  const onChangeEmail = (e: any) => {
    setSignUpInputs((p) => ({
      ...p,
      email: e.target.value,
    }));
  };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        이메일을 <br /> 입력해주세요.
      </S.GuidanceWrapper>

      <LineInput
        register={register}
        registerOption={{ onChange: onChangeEmail }}
        type="email"
        style={{ width: "100%" }}
        name="email"
        placeholder="이메일을 입력해주세요."
      />
      <S.ErrorTextWrapper>{formState.errors.email?.message}</S.ErrorTextWrapper>
    </S.Wrapper>
  );
}
