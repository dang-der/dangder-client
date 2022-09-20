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
} from "../../../../Commons/Types/Generated/types";
import { ChangeEvent, useEffect } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import ImageFileInput from "../../../Commons/FileInput/ImageFileInput";
import LineInput from "../../../Commons/LineInputs/LineInput";
import { userInfo } from "os";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import BirthInput from "../../../Commons/LineInputs/BirthInput/BirthInput";

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
  myDog: IDog | undefined;
}

export default function DogProfileEditUI({ myDog }: DogProfileEditUIProps) {
  const [inputs, setInputs] = useRecoilState(profileInputState);
  const [userInfo] = useRecoilState(userInfoState);

  const fakeCharacters: ICharacter[] = [
    { character: "온순함", id: "1", dogs: [] },
    { character: "사나움", id: "2", dogs: [] },
    { character: "정신없음", id: "3", dogs: [] },
    { character: "활발함", id: "4", dogs: [] },
    { character: "eqwrqwer", id: "5", dogs: [] },
    { character: "qwe", id: "6", dogs: [] },
    { character: "qweqw", id: "7", dogs: [] },
    { character: "wc", id: "8", dogs: [] },
  ];
  const fakeInterests: IInterest[] = [
    { id: "1", interest: "공놀이", dogs: [] },
    { id: "2", interest: "산책", dogs: [] },
    { id: "3", interest: "간식", dogs: [] },
    { id: "4", interest: "개껌", dogs: [] },
    { id: "5", interest: "qewr", dogs: [] },
    { id: "6", interest: "12", dogs: [] },
    { id: "7", interest: "fdgs", dogs: [] },
    { id: "8", interest: "qewrq", dogs: [] },
  ];
  const fakeAvoid = ["진돗개", "코네카르소", "불독"];

  useEffect(() => {
    if (!myDog) return;
  }, [myDog]);

  const onClickValue = (category: string, value: string) => () => {
    setInputs((p) => {
      const copy = [...p.dogInput[category]];

      inputs.dogInput.interests.includes(value)
        ? copy.splice(copy.indexOf(value), 1)
        : copy.push(value);

      return {
        ...p,
        dogInput: {
          ...p.dogInput,
          [category]: copy,
        },
      };
    });
  };

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

  const onChangeBirthYear = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        dogBirthYear: Number(e.target.value),
      },
    }));
  };

  const onChangeBirthMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        dogBirthMonth: Number(e.target.value),
      },
    }));
  };

  const onChangeBirthDay = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({
      ...p,
      dogInput: {
        ...p.dogInput,
        dogBirthDay: Number(e.target.value),
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
    <>
      <S.Wrapper>
        <S.ChangeDogWrapper>
          <S.ChangeDogSpan>다른 댕댕이로 등록하고 싶으신가요?</S.ChangeDogSpan>
          <Link
            href={`/profile/init?user=${userInfo?.user?.id || ""}&init=false`}
          >
            <a>
              <S.ChangeDogSpan>등록 댕댕이 변경하기 👉🏻</S.ChangeDogSpan>
            </a>
          </Link>
        </S.ChangeDogWrapper>
        <S.DogInfoWrapper>
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
          <S.MiniGuidanceText style={{ marginTop: "1rem" }}>
            🐾 가장 먼저 등록한 이미지가 대표 이미지로 설정됩니다.
          </S.MiniGuidanceText>
          <S.SubTitleWrapper style={{ marginTop: "1rem" }}>
            생일
          </S.SubTitleWrapper>
          <BirthInput
            register={register}
            onChangeDay={onChangeBirthDay}
            onChangeMonth={onChangeBirthMonth}
            onChangeYear={onChangeBirthYear}
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
          <S.SubTitleWrapper style={{ marginTop: "2rem" }}>
            댕댕이의 소개글을 작성해주세요. (5자이상 200자이내)
          </S.SubTitleWrapper>
          <S.IntroduceTextField
            {...register("introduce", {
              onChange: onChangeIntroduce,
            })}
          />
          <S.ErrorText></S.ErrorText>
        </S.DogInfoWrapper>
        <S.SubTitleWrapper>
          우리 댕댕이의 성격을 설정해주세요.
        </S.SubTitleWrapper>
        <S.TagWrapper>
          {fakeCharacters.map((e, i) => (
            <S.Tag
              key={i}
              isSelected={inputs.dogInput.characters.includes(e.character)}
              onClick={onClickValue("characters", e.character)}
            >
              {e.character}
            </S.Tag>
          ))}
        </S.TagWrapper>
        <S.SubTitleWrapper>
          우리 댕댕이의 관심사를 설정해주세요.
        </S.SubTitleWrapper>
        <S.TagWrapper>
          {fakeInterests.map((e, i) => (
            <S.Tag
              key={i}
              isSelected={inputs.dogInput.interests.includes(e.interest)}
              onClick={onClickValue("interests", e.interest)}
            >
              {e.interest}
            </S.Tag>
          ))}
        </S.TagWrapper>
        <S.SubTitleWrapper>
          우리 댕댕이가 무서워하는 견종을 선택해주세요.
        </S.SubTitleWrapper>
        <S.TagWrapper>
          {fakeAvoid.map((e, i) => (
            <S.Tag key={i}>{e}</S.Tag>
          ))}
        </S.TagWrapper>
      </S.Wrapper>
    </>
  );
}
