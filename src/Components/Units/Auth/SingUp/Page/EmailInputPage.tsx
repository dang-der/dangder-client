import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import * as S from "./Page.styles";
import LineInput from "../../../../Commons/LineInputs/LineInput";

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
      "이메일 아이디를 @까지 정확하게 입력해 주세요."
    )
    .required("이메일을 입력해주세요."),
});

export default function EmailInputPage() {
  const [, setSignUpInputs] = useRecoilState(signUpInputState);
  const { register, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setSignUpInputs((p) => ({ ...p, isActiveButton: false }));
  }, []);

  const onChangeEmail = (e: any) => {
    setSignUpInputs((p) => ({
      ...p,
      email: e.target.value,
    }));

    if (e.target.value.length > 0) {
      setSignUpInputs((p) => ({ ...p, isActiveButton: true }));
    }
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
