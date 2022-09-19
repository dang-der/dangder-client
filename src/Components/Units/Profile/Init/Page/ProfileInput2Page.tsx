import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileInputState } from "../../../../../Commons/Store/Profile/ProfileInitState";
import {
  ICharacter,
  IInterest,
} from "../../../../../Commons/Types/Generated/types";
import * as S from "./Page.styles";

interface ProfileInput2PageProps {
  characters: ICharacter[];
  interests: IInterest[];
  // avoidBreeds: string[];
}
export default function ProfileInput2Page({
  
  
}: ProfileInput2PageProps) {
  const [inputs, setInputs] = useRecoilState(profileInputState);

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
    console.log(inputs);
  }, [inputs]);

  const onClickValue = (category: string, value: string) => () => {
    setInputs((p) => {
      const copy = [...p.dogInput[category]];

      inputs.dogInput[category].includes(value)
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

  return (
    <S.Wrapper>
      <S.GuidanceWrapper>
        🐶 댕댕이
        <br />
        프로필 설정
      </S.GuidanceWrapper>

      <S.SubTitleWrapper>우리 댕댕이의 성격을 설정해주세요.</S.SubTitleWrapper>
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

      <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
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

      <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
        우리 댕댕이가 무서워하는 견종을 선택해주세요.
      </S.SubTitleWrapper>
      <S.TagWrapper>
        {fakeAvoid.map((e, i) => (
          <S.Tag key={i}>{e}</S.Tag>
        ))}
      </S.TagWrapper>
    </S.Wrapper>
  );
}
