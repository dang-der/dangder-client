import React, { useState } from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import * as S from "./DogMainPage.styles";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

interface StackProps {
  onVote: (data: any, vote: boolean, direction: string | undefined) => void;
  datas: any;
  refetch?: any;
  nonRefetch?: any;
}

export default function DogMainUI({
  onVote,
  datas,
  refetch,
  nonRefetch,
}: StackProps) {
  const [userInfo] = useRecoilState(userInfoState);
  const [stack, setStack] = useState(datas);
  const [page, setPage] = useState(1);

  console.log("DogMainUI", datas);

  const pop = (array: any[] | undefined) => {
    if (!array) return;

    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (
    item: any,
    vote: boolean,
    direction: string | undefined
  ) => {
    const newStack = pop(stack);
    setStack(newStack);

    if (userInfo !== undefined && newStack?.length === 0) {
      refetch({ page: page + 1 });
    }

    if (userInfo === undefined && newStack?.length === 0) {
      nonRefetch({ page: page + 1 });
    }

    onVote(item, vote, direction);
  };

  return (
    <>
      <Frame>
        {userInfo && (
          <S.PositionButtonWrapper>
            <S.IconWrapper>
              <NearMeRoundedIcon />
            </S.IconWrapper>
          </S.PositionButtonWrapper>
        )}

        {(stack || []).map((item: any, index: any) => {
          const isTop = index === (stack?.length || 0) - 1;

          console.log("stack", stack);
          return (
            <Card
              drag={isTop}
              key={item.id || index}
              onVote={(result, direction) =>
                handleVote(item, result, direction)
              }
              data={item}
            />
          );
        })}
      </Frame>
    </>
  );
}
