import { ChangeEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import * as S from "./Page.styles";

export default function AuthCodeInputPage() {
  const [, setSignUpInputs] = useRecoilState(signUpInputState);

  useEffect(() => {
    setSignUpInputs((p) => ({ ...p, isActiveButton: false }));
  }, []);

  const onChangeAuthCode =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!(e.target instanceof HTMLInputElement)) return;

      if (e.target.value.length > 1) {
        e.target.value = e.target.value.substring(0, 1);
      }

      if (e.target.value.length === 1) {
        setSignUpInputs((p) => {
          const copy = [...p.authenticationCode];
          copy[index] = e.target.value;

          return {
            ...p,
            isActiveButton: copy.every((e) => e),
            authenticationCode: copy,
          };
        });

        if (index >= 3) return;
        document.getElementById(`code${index + 1}`)?.focus();
      }
    };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        이메일로 받은
        <br /> 인증번호를 입력해주세요.
      </S.GuidanceWrapper>
      <S.AuthCodeBoxWrapper>
        {Array(4)
          .fill(0)
          .map((e, i) => (
            <S.AuthCodeBox
              key={i}
              id={`code${i}`}
              type="number"
              onChange={onChangeAuthCode(i)}
            />
          ))}
      </S.AuthCodeBoxWrapper>
    </S.Wrapper>
  );
}
