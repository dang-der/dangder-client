import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as S from "./Page.styles";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import LineInput from "../../../../Commons/LineInputs/LineInput";

const schema = yup.object({
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/,
      "영문+숫자 조합 비밀번호를 입력해 주세요."
    )
    .required("비밀번호를 입력해주세요"),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 확인해주세요."),
});

export default function PasswordInputPage() {
  const [inputs, setSignUpInputs] = useRecoilState(signUpInputState);

  const { register, formState, getValues, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!inputs.password && !inputs.passwordCheck) return;
    reset({
      password: inputs.password,
      passwordCheck: inputs.passwordCheck,
    });
  }, []);

  const onChangePassword = (e: any) => {
    setSignUpInputs((p) => ({
      ...p,
      password: e.target.value,
    }));
  };

  const onChangePasswordCheck = (e: any) => {
    if (inputs.password !== getValues("passwordCheck")) return;

    setSignUpInputs((p) => ({
      ...p,
      passwordCheck: e.target.value,
    }));
  };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        비밀번호를 <br /> 입력해주세요.
      </S.GuidanceWrapper>

      <div>
        <LineInput
          register={register}
          registerOption={{ onChange: onChangePassword }}
          type="password"
          style={{ width: "100%" }}
          name="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <S.ErrorTextWrapper>
          {formState.errors.password?.message}
        </S.ErrorTextWrapper>
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <LineInput
          register={register}
          registerOption={{ onChange: onChangePasswordCheck }}
          type="password"
          style={{ width: "100%" }}
          name="passwordCheck"
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <S.ErrorTextWrapper>
          {formState.errors.passwordCheck?.message}
        </S.ErrorTextWrapper>
      </div>
    </S.Wrapper>
  );
}
