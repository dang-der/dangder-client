import { ChangeEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import Timer from "../../../../Commons/Timer/Timer";
import * as S from "./Page.styles";

interface AuthCodeInputPageProps {
  verifyError: string;
}
export default function AuthCodeInputPage({
  verifyError,
}: AuthCodeInputPageProps) {
  const [inputs, setInputs] = useRecoilState(signUpInputState);

  const onChangeAuthCode =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!(e.target instanceof HTMLInputElement)) return;

      if (e.target.value.length > 1) {
        e.target.value = e.target.value.substring(0, 1);
      }

      if (e.target.value.length === 1) {
        setInputs((p) => {
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
              defaultValue={
                inputs.authenticationCode[i] !== 0 &&
                inputs.authenticationCode[i]
              }
            />
          ))}
      </S.AuthCodeBoxWrapper>

      <S.AuthCodeBoxWrapper style={{ marginTop: "2rem" }}>
        {verifyError && <S.ErrorTextWrapper>{verifyError}</S.ErrorTextWrapper>}
        <Timer
          initialTime={3 * 60 * 1000}
          onTimerEnd={() => {
            setInputs((p) => ({ ...p, isActiveButton: false }));
          }}
        />
      </S.AuthCodeBoxWrapper>
    </S.Wrapper>
  );
}
