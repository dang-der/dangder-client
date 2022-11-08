import React, { useState } from "react";
import styled from "@emotion/styled";
import { InterestsCard } from "./InterestsCard";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import * as S from "./Interests.styles";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import {
  IInterestCategoryOutput,
  IQuery,
} from "../../../Commons/Types/Generated/types";

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
  interestCategoryData: Pick<IQuery, "fetchInterestCategory"> | undefined;
}

export default function InterestsUI({
  onVote,
  datas,
  refetch,
  nonRefetch,
  interestCategoryData,
}: StackProps) {
  const [userInfo] = useRecoilState(userInfoState);
  const [stack, setStack] = useState(datas);
  const [page, setPage] = useState(1);
  const router = useRouter();

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

  const onClickBackArrow = () => {
    if (router.pathname === "/chat/[roomId]") {
      router.replace("/chat");
      return;
    }

    router.back();
  };

  return (
    <>
      <S.HeaderWrapper>
        <ArrowBackIcon
          onClick={onClickBackArrow}
          style={{ cursor: "pointer" }}
        />
        {interestCategoryData ? (
          interestCategoryData?.fetchInterestCategory.map(
            (e: IInterestCategoryOutput) => {
              return (
                <S.InterestTitleWrapper key={e.interest} id={e.interest}>
                  <S.InterestTitle>{e.title}</S.InterestTitle>
                </S.InterestTitleWrapper>
              );
            }
          )
        ) : (
          <></>
        )}
        <ChatIcon src="/chat.svg" />
      </S.HeaderWrapper>
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
            <InterestsCard
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

const ChatIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
