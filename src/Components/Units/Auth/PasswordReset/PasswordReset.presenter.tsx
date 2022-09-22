import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BlueButton from "../../../Commons/Button/BlueButton";
import LargeButton from "../../../Commons/Button/LargeButton";
import LineInputWithLabelError from "../../../Commons/LineInputs/LineInputWithLabel/LineInputWithLabel";

import * as S from "./PasswordReset.styles";
import Timer from "../../../Commons/Timer/Timer";
import { ChangeEvent, useEffect, useState } from "react";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import { useRecoilState } from "recoil";

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
      "이메일 아이디를 @까지 정확하게 입력해 주세요."
    )
    .required("이메일을 입력해주세요."),
  code: yup
    .string()
    .matches(/^[0-9]+$/g, "숫자만 입력 가능합니다.")
    .required("인증번호를 입력해주세요."),
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

interface PasswordResetUIProps {
  handleCreateMailToken: (email: string) => Promise<boolean>;
  handleVerifyMailToken: (code: string, email: string) => Promise<boolean>;
  handleUpdateUser: (email: string, password: string) => void;
}

export default function PasswordResetUI({
  handleCreateMailToken,
  handleVerifyMailToken,
  handleUpdateUser,
}: PasswordResetUIProps) {
  const [timerVisible, setTimerVisible] = useState<boolean>();
  const [verifyError, setVerifyError] = useState("");
  const [buttonActive, setButtonActive] = useState([false, false]);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const { register, formState, getValues, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setTimerVisible(false);
  }, []);

  useEffect(() => {
    console.log(buttonActive);
  }, [buttonActive]);

  const onClickAuthRequest = async () => {
    if (timerVisible) return;
    const result = await handleCreateMailToken(getValues("email"));
    setTimerVisible(result);
  };

  const onClickVerify = async () => {
    const result = await handleVerifyMailToken(
      getValues("code"),
      getValues("email")
    );

    if (!result) {
      setVerifyError("인증번호가 일치하지 않습니다.");
    } else {
      setVerifyError("");
    }

    setTimerVisible(false);
  };

  const onClickUpdate = () => {
    if (Object.values(getValues()).every((e) => e) && verifyError === "") {
      handleUpdateUser(getValues("email"), getValues("password"));
      console.log("onClickUpdatePassword");
      return;
    }

    setExceptionModal({ visible: true, message: "입력값을 확인해주세요." });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(name, value);
    if (name === "email") setButtonActive((p) => [!!value, p[1]]);
    if (name === "code") setButtonActive((p) => [p[0], !!value]);
  };

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <LineInputWithLabelError
          label="이메일"
          register={register}
          registerOption={{ onChange }}
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          style={{ width: "100%", flex: "1", marginRight: "1rem" }}
          error={String(formState.errors.email?.message || "")}
        />

        <BlueButton
          title="인증요청"
          style={{ fontSize: "0.875rem", width: "6rem" }}
          onClick={onClickAuthRequest}
        />
      </S.InputWrapper>

      <S.InputWrapper style={{ marginTop: "2rem" }}>
        <LineInputWithLabelError
          label="인증번호"
          register={register}
          registerOption={{ onChange }}
          type="text"
          name="code"
          placeholder="인증번호를 입력해주세요."
          style={{ width: "100%", flex: "1", marginRight: "1rem" }}
          error={String(formState.errors.code?.message || "") || verifyError}
        />

        <BlueButton
          title="인증확인"
          style={{ fontSize: "0.875rem", width: "6rem", lineHight: "1rem" }}
          onClick={onClickVerify}
        />
      </S.InputWrapper>

      {timerVisible && (
        <S.TimerText>
          <Timer
            initialTime={3 * 60 * 1000}
            onTimerEnd={() => {
              setTimerVisible(false);
              reset({ code: "" });
              setVerifyError("");
            }}
          />
        </S.TimerText>
      )}

      <S.InputWrapper>
        <LineInputWithLabelError
          label="비밀번호 변경"
          register={register}
          type="password"
          name="password"
          placeholder="변경할 비밀번호를 입력해주세요."
          style={{ width: "100%", flex: "1", marginRight: "1rem" }}
          error={String(formState.errors.password?.message || "")}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <LineInputWithLabelError
          label="비밀번호 변경 확인"
          register={register}
          type="password"
          name="passwordCheck"
          placeholder="변경할 비밀번호를 다시 입력해주세요."
          style={{ width: "100%", flex: "1", marginRight: "1rem" }}
          error={String(formState.errors.passwordCheck?.message || "")}
        />
      </S.InputWrapper>

      <S.ButtonWrapper>
        <LargeButton title="비밀번호 변경" onClick={onClickUpdate} />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
