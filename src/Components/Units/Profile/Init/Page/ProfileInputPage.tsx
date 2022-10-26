import { useForm } from "react-hook-form";
import { Checkbox } from "antd";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import * as S from "./Page.styles";
import ImageFileInput from "../../../../Commons/FileInput/ImageFileInput";
import { useRecoilState } from "recoil";
import { profileInputState } from "../../../../../Commons/Store/Profile/ProfileInitState";
import { ChangeEvent } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import BirthInput from "../../../../Commons/LineInputs/BirthInput/BirthInput";

const schema = yup.object({
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
  introduce: yup
    .string()
    .min(5, "최소 5자 이상의 내용을 입력해주세요.")
    .max(200, "최대 200자까지 입력할 수 있습니다.")
    .required("내용을 입력해주세요."),
});
export default function ProfileInputPage() {
  const [inputs, setInputs] = useRecoilState(profileInputState);

  const { register, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onChangeFile = (index: number) => (file: File) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      if (typeof data.target?.result !== "string") return;
      const fileUrl = data.target?.result;

      setInputs((p) => {
        const copy = [...p.dogInput.imageUrls];
        copy[index] = fileUrl;

        const fileCopy = [...p.dogInput.imageFiles];
        fileCopy[index] = file;

        return {
          ...p,
          dogInput: {
            ...p.dogInput,
            imageUrls: copy,
            imageFiles: fileCopy,
          },
        };
      });
    };
  };

  const onChangeDogBirthYear = (year: number) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        dogBirthYear: year,
      },
    }));
  };

  const onChangeDogBirthMonth = (month: number) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        dogBirthMonth: month,
      },
    }));
  };

  const onChangeDogBirthDay = (day: number) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        dogBirthDay: day,
      },
    }));
  };

  const onChangeCheckUnknownBirth = (e: CheckboxChangeEvent) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        isUnknownDogBirth: e.target.checked,
      },
    }));
  };

  const onChangeIntroduce = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        introduce: e.target.value,
      },
    }));
  };

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        🐶 댕댕이
        <br />
        프로필 설정
      </S.GuidanceWrapper>
      <S.RowWrapper>
        <S.SubTitleWrapper>이미지</S.SubTitleWrapper>
        <S.MiniGuidanceText>
          이미지는 최대 3장까지 등록 가능합니다.
        </S.MiniGuidanceText>
      </S.RowWrapper>
      <S.RowWrapper>
        {Array(3)
          .fill(0)
          .map((e, i) => (
            <ImageFileInput
              key={uuid()}
              onChangeFile={onChangeFile(i)}
              defaultImageUrl={inputs.dogInput.imageUrls[i]}
            />
          ))}
      </S.RowWrapper>
      <S.MiniGuidanceText style={{ marginTop: "1.5rem" }}>
        🐾 가장 먼저 등록한 이미지가 대표 이미지로 설정됩니다.
      </S.MiniGuidanceText>

      <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
        생일
      </S.SubTitleWrapper>
      <BirthInput
        register={register}
        onChangeYear={onChangeDogBirthYear}
        onChangeMonth={onChangeDogBirthMonth}
        onChangeDay={onChangeDogBirthDay}
      />

      <S.ErrorText>
        {formState.errors.birthYear?.message ??
          formState.errors.birthMonth?.message ??
          formState.errors.birthDay?.message ??
          " "}
      </S.ErrorText>
      <S.CheckBirthUnknowingnessWrapper style={{ marginTop: "1rem" }}>
        <Checkbox onChange={onChangeCheckUnknownBirth} />
        <S.MiniGuidanceText>댕댕이의 생년월일을 몰라요!</S.MiniGuidanceText>
      </S.CheckBirthUnknowingnessWrapper>

      <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
        댕댕이의 소개글을 작성해주세요. (5자이상 200자이내)
      </S.SubTitleWrapper>
      <S.IntroduceTextField
        {...register("introduce", {
          onChange: onChangeIntroduce,
        })}
      />
      <S.ErrorText></S.ErrorText>
    </S.Wrapper>
  );
}
