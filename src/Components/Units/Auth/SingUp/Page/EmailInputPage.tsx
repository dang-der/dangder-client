import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import * as S from "./Page.styles";

const schema = yup.object({
  email: yup.string().required("이메일을 입력해주세요."),
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

    // todo : 입력값 체크 로직 변경
    if (formState.isValid) {
      setSignUpInputs((p) => ({ ...p, isActiveButton: true }));
    }
  };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        이메일을 <br /> 입력해주세요.
      </S.GuidanceWrapper>

      <input
        type="email"
        style={{ width: "100%" }}
        placeholder="이메일을 입력해주세요."
        {...register("email", {
          onChange: onChangeEmail,
        })}
      />
      <p>에러메세지 출력 부분</p>
    </S.Wrapper>
  );
}
