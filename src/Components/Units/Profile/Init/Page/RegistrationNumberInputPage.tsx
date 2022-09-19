import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import LineInput from "../../../../Commons/LineInputs/LineInput";
import * as S from "./Page.styles";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { profileInputState } from "../../../../../Commons/Store/Profile/ProfileInitState";
import BirthInput from "../../../../Commons/LineInputs/BirthInput/BirthInput";

const schema = yup.object({
  registrationNumber: yup
    .string()
    .max(15, "15자 이상 입력이 불가합니다.")
    .required("댕댕이의 등록번호를 입력해주세요."),
  birthYear: yup
    .string()
    .max(4, "올바른 생년월일을 입력해주세요.")
    .required("생년월일을 입력해주세요."),
  birthMonth: yup
    .string()
    .max(2, "올바른 생년월일을 입력해주세요.")
    .required("생년월일을 입력해주세요."),
  birthDay: yup
    .string()
    .max(2, "올바른 생년월일을 입력해주세요.")
    .required("생년월일을 입력해주세요."),
});

export default function RegistrationNumberInputPage() {
  const [, setInputs] = useRecoilState(profileInputState);
  const { register, formState  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onChangeRegisterNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({ ...p, registerNumber: e.target.value }));
  };

  const onChangeOwnerBirthYear = (year: number) => {
    setInputs((p) => ({ ...p, ownerBirthYear: year }));
  };

  const onChangeOwnerBirthMonth = (month: number) => {
    setInputs((p) => ({ ...p, ownerBirthMonth: month }));
  };

  const onChangeOwnerBirthDay = (day: number) => {
    setInputs((p) => ({ ...p, ownerBirthDay: day }));
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
      <S.SubTitleWrapper style={{ marginTop: "3.5rem" }}>
        견주의 생년월일을 입력해주세요.
      </S.SubTitleWrapper>

      <BirthInput
        register={register}
        onChangeYear={onChangeOwnerBirthYear}
        onChangeMonth={onChangeOwnerBirthMonth}
        onChangeDay={onChangeOwnerBirthDay}
      />

      <S.ErrorText>
        {formState.errors.birthYear?.message ??
          formState.errors.birthMonth?.message ??
          formState.errors.birthDay?.message ??
          " "}
      </S.ErrorText>
    </S.Wrapper>
  );
}
