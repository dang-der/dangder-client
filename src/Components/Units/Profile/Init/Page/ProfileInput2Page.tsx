import { useState } from "react";
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
  characters,
  interests,
}: ProfileInput2PageProps) {
  const fakeCharacters = ["온순함", "착함", "비글미", "정신없음"];
  const fakeInterests = ["간식", "산책", "공놀이", "개껌"];
  const fakeAvoid = ["진돗개", "코네카르소", "불독"];

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
          <S.Tag key={i}>{e}</S.Tag>
        ))}
      </S.TagWrapper>
      <S.SubTitleWrapper>
        우리 댕댕이의 관심사를 설정해주세요.
      </S.SubTitleWrapper>
      <S.TagWrapper>
        {fakeInterests.map((e, i) => (
          <S.Tag key={i}>{e}</S.Tag>
        ))}
      </S.TagWrapper>
      <S.SubTitleWrapper>
        우리 댕댕이이가 무서워하는 견종을 선택해주세요.
      </S.SubTitleWrapper>
      <S.TagWrapper>
        {fakeAvoid.map((e, i) => (
          <S.Tag key={i}>{e}</S.Tag>
        ))}
      </S.TagWrapper>
    </S.Wrapper>
  );
}
