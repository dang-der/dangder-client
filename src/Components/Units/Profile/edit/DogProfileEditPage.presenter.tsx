import * as S from "./DogProfileEditPage.styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState } from "recoil";
import { IDog, IQuery } from "../../../../Commons/Types/Generated/types";
import { ChangeEvent, useEffect } from "react";

import ImageFileInput from "../../../Commons/FileInput/ImageFileInput";
import LineInput from "../../../Commons/LineInputs/LineInput";
import LargeButton from "../../../Commons/Button/LargeButton";
import { dogProfileEditState } from "../../../../Commons/Store/Profile/ProfileEditState";

const schema = yup.object({
  age: yup.string().required("나이를 입력해주세요."),
  introduce: yup
    .string()
    .min(5, "최소 5자 이상의 내용을 입력해주세요.")
    .max(200, "최대 200자까지 입력할 수 있습니다.")
    .required("내용을 입력해주세요."),
});

interface DogProfileEditUIProps {
  myDog: IDog;
  charactersData: Pick<IQuery, "fetchCharacters"> | undefined;
  interestsData: Pick<IQuery, "fetchInterestCategory"> | undefined;
  handleUpdateDog: () => void;
}

export default function DogProfileEditUI({
  myDog,
  charactersData,
  interestsData,
  handleUpdateDog,
}: DogProfileEditUIProps) {
  const [inputs, setInputs] = useRecoilState(dogProfileEditState);
  const { register, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setInputs({
      age: myDog.age,
      interests: myDog.interests.map((e) => e.interest),
      characters: myDog.characters.map((e) => e.character),
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

  const onClickValue = (category: string, value: string) => () => {
    setInputs((p) => {
      const copy = [...p[category]];

      inputs[category].includes(value)
        ? copy.splice(copy.indexOf(value), 1)
        : copy.push(value);

      return {
        ...p,
        [category]: copy,
      };
    });
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
                key={i}
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
              isSelected={inputs.characters.includes(e.character)}
              onClick={onClickValue("characters", e.character)}
            >
              {e.character}
            </S.Tag>
          ))}
        </S.TagWrapper>

        <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
          우리 댕댕이의 관심사를 설정해주세요.
        </S.SubTitleWrapper>
        <S.TagWrapper>
          {(interestsData?.fetchInterestCategory || []).map((e, i) => (
            <S.Tag
              key={i}
              isSelected={inputs.interests.includes(e.interest)}
              onClick={onClickValue("interests", e.interest)}
            >
              {e.interest}
            </S.Tag>
          ))}
        </S.TagWrapper>

        <LargeButton title="수정하기" onClick={handleUpdateDog} />
      </S.Wrapper>
    </>
  );
}
