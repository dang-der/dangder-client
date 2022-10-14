import * as S from "./DogProfileEditPage.styles";
import { useForm } from "react-hook-form";
import { Checkbox } from "antd";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { profileInputState } from "../../../../Commons/Store/Profile/ProfileInitState";
import {
  ICharacter,
  IDog,
  IInterest,
  IQuery,
} from "../../../../Commons/Types/Generated/types";
import { ChangeEvent, useEffect, useLayoutEffect } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ImageFileInput from "../../../Commons/FileInput/ImageFileInput";
import LineInput from "../../../Commons/LineInputs/LineInput";
import { userInfo } from "os";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import BirthInput from "../../../Commons/LineInputs/BirthInput/BirthInput";
import { dogProfileEditState } from "../../../../Commons/Store/Profile/ProfileEditState";

interface ProfileInput2PageProps {
  characters: ICharacter[];
  interests: IInterest[];
  // avoidBreeds: string[];
}

const schema = yup.object({
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
  introduce: yup
    .string()
    .min(5, "최소 5자 이상의 내용을 입력해주세요.")
    .max(200, "최대 200자까지 입력할 수 있습니다.")
    .required("내용을 입력해주세요."),
});

interface DogProfileEditUIProps {
  myDog: IDog;
  charactersData: Pick<IQuery, "fetchCharacters"> | undefined;
  interestsData: Pick<IQuery, "fetchInterests"> | undefined;
}

export default function DogProfileEditUI({
  myDog,
  charactersData,
  interestsData,
}: DogProfileEditUIProps) {
  const [inputs, setInputs] = useRecoilState(dogProfileEditState);
  const { register, formState, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setInputs({
      age: myDog.age,
      interests: myDog.interests,
      characters: myDog.characters,
      introduce: myDog.description,
      imageUrls: myDog.img.map((e) => e.img),
      imageFiles: [],
    });

    reset({ age: myDog.age, introduce: myDog.description });
  }, []);

  const onChangeFile = (index: number) => (file: File) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      if (typeof data.target?.result !== "string") return;
      const fileUrl = data.target?.result;

      setInputs((p) => {
        const copy = [...p.imageUrls];
        copy[index] = fileUrl;

        const fileCopy = [...p.imageFiles];
        fileCopy[index] = file;

        return {
          ...p,
          imageUrls: copy,
          imageFiles: fileCopy,
        };
      });
    };
  };

  const onChangeAge = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs((p) => ({
      ...p,
      age: Number(e.target.value),
    }));
  };

  const onChangeIntroduce = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs((p) => ({
      ...p,
      introduce: e.target.value,
    }));
  };

  return (
    <>
      <S.Wrapper>
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
                defaultImageUrl={inputs.imageUrls[i]}
              />
            ))}
        </S.RowWrapper>
        <S.MiniGuidanceText style={{ marginTop: "2rem" }}>
          🐾 가장 먼저 등록한 이미지가 대표 이미지로 설정됩니다.
        </S.MiniGuidanceText>

        <S.SubTitleWrapper style={{ marginTop: "3rem" }}>
          나이
        </S.SubTitleWrapper>

        <LineInput
          register={register}
          registerOption={{ onChange: onChangeAge }}
          type="number"
          style={{ width: "100%", textAlign: "center", marginTop: "1.5rem" }}
          name="age"
          placeholder="나이를 입력해주세요."
        />

        <S.SubTitleWrapper style={{ marginTop: "3rem" }}>
          댕댕이의 소개글을 작성해주세요. (5자이상 200자이내)
        </S.SubTitleWrapper>
        <S.IntroduceTextField
          {...register("introduce", {
            onChange: onChangeIntroduce,
          })}
        />
        <S.ErrorText></S.ErrorText>

        <S.SubTitleWrapper style={{ marginTop: "3rem" }}>
          우리 댕댕이의 성격을 설정해주세요.
        </S.SubTitleWrapper>
        <S.TagWrapper>
          {(charactersData?.fetchCharacters || []).map((e, i) => (
            <S.Tag
              key={i}
              isSelected={inputs.characters.includes(e)}
              // onClick={onClickValue("characters", e.character)}
            >
              {e.character}
            </S.Tag>
          ))}
        </S.TagWrapper>

        <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
          우리 댕댕이의 관심사를 설정해주세요.
        </S.SubTitleWrapper>
        <S.TagWrapper>
          {(interestsData?.fetchInterests || []).map((e, i) => (
            <S.Tag
              key={i}
              isSelected={inputs.interests.includes(e.interest)}
              // onClick={onClickValue("interests", e.interest)}
            >
              {e.interest}
            </S.Tag>
          ))}
        </S.TagWrapper>
      </S.Wrapper>
    </>
  );
}
