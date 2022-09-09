import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import LineInput from "../../../../Commons/LineInputs/LineInput";
import * as S from "./Page.styles";
import { ChangeEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileInputState } from "../../../../../Commons/Store/Profile/ProfileInitState";

const schema = yup.object({
  registrationNumber: yup
    .string()
    .required("댕댕이의 등록번호를 입력해주세요."),
  birthYear: yup
    .number()
    .lessThan(2022, "올바른 생년월일을 입력해주세요.")
    .required("생년월일을 입력해주세요.")
    .typeError(""),

  birthMonth: yup
    .number()
    .typeError("")
    .max(12, "올바른 생년월일을 입력해주세요.")
    .required("생년월일을 입력해주세요."),
  birthDay: yup
    .number()
    .typeError("")
    .max(31, "올바른 생년월일을 입력해주세요.")
    .required("생년월일을 입력해주세요."),
});

export default function RegistrationNumberInputPage() {
  const [, setInputs] = useRecoilState(profileInputState);
  const { register, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onChangeRegisterNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({ ...p, registerNumber: e.target.value }));
  };

  const onChangeOwnerBirthYear = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({ ...p, ownerBirthYear: Number(e.target.value) }));
  };

  const onChangeOwnerBirthMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({ ...p, ownerBirthMonth: Number(e.target.value) }));
  };

  const onChangeOwnerBirthDay = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({ ...p, ownerBirthDay: Number(e.target.value) }));
  };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        댕댕이의
        <br />
        등록번호를 <br />
        입력해주세요.
        <br />
      </S.GuidanceWrapper>
      <LineInput
        register={register}
        registerOption={{ onChange: onChangeRegisterNumber }}
        type="number"
        name="registrationNumber"
        placeholder="댕댕이의 등록번호를 입력해주세요."
      />
      <S.ErrorText>
        {formState.errors.registrationNumber?.message ?? " "}
      </S.ErrorText>
      <S.SubTitleWrapper style={{ marginTop: "1rem" }}>
        견주의 생년월일을 입력해주세요.
      </S.SubTitleWrapper>
      <S.BirthdayWrapper>
        <LineInput
          register={register}
          registerOption={{ onChange: onChangeOwnerBirthYear }}
          type="number"
          name="birthYear"
          placeholder="1995"
          style={{ textAlign: "center" }}
        />
        <span>년</span>

        <LineInput
          register={register}
          registerOption={{ onChange: onChangeOwnerBirthMonth }}
          type="number"
          name="birthMonth"
          placeholder="06"
          style={{ textAlign: "center" }}
        />
        <span>월</span>

        <LineInput
          register={register}
          registerOption={{ onChange: onChangeOwnerBirthDay }}
          type="number"
          name="birthDay"
          placeholder="06"
          style={{ textAlign: "center" }}
        />
        <span>일</span>
      </S.BirthdayWrapper>
      <S.ErrorText>
        {formState.errors.birthYear?.message ??
          formState.errors.birthMonth?.message ??
          formState.errors.birthDay?.message ??
          " "}
      </S.ErrorText>
    </S.Wrapper>
  );
}
