import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { dogInfoInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import { profileInputState } from "../../../../../Commons/Store/Profile/ProfileInitState";
import {
  IAvoidBreed,
  ICharacter,
  IInterest,
} from "../../../../../Commons/Types/Generated/types";
import * as S from "../../../Profile/Init/Page/Page.styles";

interface ProfileInput2PageProps {
  characters: ICharacter[] | undefined;
  interests: IInterest[] | undefined;
  avoidBreeds: IAvoidBreed[] | undefined;
}
export default function ProfileInput2Page({
  characters,
  interests,
  avoidBreeds,
}: ProfileInput2PageProps) {
  const [inputs, setInputs] = useRecoilState(dogInfoInputState);

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
    <S.Wrapper>
      <S.GuidanceWrapper>
        πΆ λλμ΄
        <br />
        νλ‘ν μ€μ 
      </S.GuidanceWrapper>

      <S.SubTitleWrapper>μ°λ¦¬ λλμ΄μ μ±κ²©μ μ€μ ν΄μ£ΌμΈμ.</S.SubTitleWrapper>
      <S.TagWrapper>
        {(characters || []).map((e, i) => (
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
        μ°λ¦¬ λλμ΄μ κ΄μ¬μ¬λ₯Ό μ€μ ν΄μ£ΌμΈμ.
      </S.SubTitleWrapper>
      <S.TagWrapper>
        {(interests || []).map((e, i) => (
          <S.Tag
            key={i}
            isSelected={inputs.interests.includes(e.interest)}
            onClick={onClickValue("interests", e.interest)}
          >
            {e.interest}
          </S.Tag>
        ))}
      </S.TagWrapper>

      <S.SubTitleWrapper style={{ marginTop: "2.5rem" }}>
        μ°λ¦¬ λλμ΄κ° λ¬΄μμνλ κ²¬μ’μ μ νν΄μ£ΌμΈμ.
      </S.SubTitleWrapper>
      <S.TagWrapper>
        {(avoidBreeds || []).map((e: IAvoidBreed, i) => (
          <S.Tag
            key={i}
            isSelected={inputs.avoid.includes(e.avoidBreed)}
            onClick={onClickValue("avoid", e.avoidBreed)}
          >
            {e.avoidBreed}
          </S.Tag>
        ))}
      </S.TagWrapper>
    </S.Wrapper>
  );
}
