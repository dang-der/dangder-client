import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as S from "./Page.styles";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";

const schema = yup.object({
  password: yup.string().matches(/[^A-Za-z0-9$]/gi, "특수문자를 포함해 주세요").required("비밀번호를 입력해주세요."),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 확인해주세."),
});

export default function PasswordInputPage() {
  const [inputs, setSignUpInputs] = useRecoilState(signUpInputState);

  const { register, formState, getValues } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setSignUpInputs((p) => ({ ...p, isActiveButton: false }));
  }, []);

  const onChangePassword = (e: any) => {
    setSignUpInputs((p) => ({
      ...p,
      password: e.target.value,
    }));
  };

  const onChangePasswordCheck = () => {
    if (inputs.password !== getValues("passwordCheck")) return;

    setSignUpInputs((p) => ({
      ...p,
      isActiveButton: true,
    }));
  };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        비밀번호를 <br /> 입력해주세요.
      </S.GuidanceWrapper>

      <div>
        <input
          type="text"
          style={{ width: "100%" }}
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            onChange: onChangePassword,
          })}
        />
        <span>{formState.errors.password?.message}</span>
      </div>

      <div>
        <input
          type="text"
          style={{ width: "100%" }}
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("passwordCheck", {
            onChange: onChangePasswordCheck,
          })}
        />
        <span>{formState.errors.passwordCheck?.message}</span>
      </div>
    </S.Wrapper>
  );
}
