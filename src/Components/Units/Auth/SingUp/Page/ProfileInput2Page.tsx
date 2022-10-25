import { useRecoilState } from "recoil";
import { dogInfoInputState } from "../../../../../Commons/Store/Auth/SignUpState";
import {
  ICharacter,
  IInterestCategoryOutput,
} from "../../../../../Commons/Types/Generated/types";
import * as S from "./Page.styles";

interface ProfileInput2PageProps {
  characters: ICharacter[] | undefined;
  interests: IInterestCategoryOutput[] | undefined;
}
export default function ProfileInput2Page({
  characters,
  interests,
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
        🐶 댕댕이
        <br />
        프로필 설정
      </S.GuidanceWrapper>

      <S.SubTitleWrapper>우리 댕댕이의 성격을 설정해주세요.</S.SubTitleWrapper>
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
        우리 댕댕이의 관심사를 설정해주세요.
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
    </S.Wrapper>
  );
}
