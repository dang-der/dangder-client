import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LineInput from "../../../../Commons/LineInputs/LineInput";
import * as S from "./Page.styles";
import { useEffect } from "react";

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
  const { register, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    console.log("formstate", formState);
  });

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
        type="number"
        name="registrationNumber"
        placeholder="댕댕이의 등록번호를 입력해주세요."
      />
      <S.ErrorText>
        {formState.errors.registrationNumber?.message ?? " "}
      </S.ErrorText>
      <S.SubTitleWrapper>견주의 생년월일을 입력해주세요.</S.SubTitleWrapper>
      <S.BirthdayWrapper>
        <LineInput
          register={register}
          type="number"
          name="birthYear"
          placeholder="1995"
          style={{ textAlign: "center" }}
        />
        <span>년</span>

        <LineInput
          register={register}
          type="number"
          name="birthMonth"
          placeholder="06"
          style={{ textAlign: "center" }}
        />
        <span>월</span>

        <LineInput
          register={register}
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
