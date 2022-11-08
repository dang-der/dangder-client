import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { InterestsCard } from "./InterestsCard";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import * as S from "./Interests.styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { IDog } from "../../../Commons/Types/Generated/types";

const Frame = styled.div`
  width: 100%;
  height: 90%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ChatIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
interface StackProps {
  onVote: (data: any, vote: boolean, direction: string | undefined) => void;
  datas: IDog[] | undefined;
  refetch?: any;
  handleClickPassTicket: (pairId: string) => Promise<void>;
  handleClickChat: () => void;
}

export default function InterestsUI({
  onVote,
  datas,
  refetch,
  handleClickPassTicket,
  handleClickChat,
}: StackProps) {
  const [userInfo] = useRecoilState(userInfoState);
  const [stack, setStack] = useState<IDog[] | undefined>();
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!datas) return;
    setStack(datas);
  }, [datas]);

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

    onVote(item, vote, direction);
  };

  const onClickBackArrow = () => {
    router.back();
  };

  return (
    <>
      <S.HeaderWrapper>
        <ArrowBackIcon
          onClick={onClickBackArrow}
          style={{ cursor: "pointer" }}
        />
        <S.PageTitleWrapper>{router.query.interest}</S.PageTitleWrapper>

        <ChatIcon
          src="/chat.svg"
          style={{ cursor: "pointer" }}
          onClick={handleClickChat}
        />
      </S.HeaderWrapper>
      <Frame>
        {(stack || []).map((item: any, index: any) => {
          const isTop = index === (stack?.length || 0) - 1;

          return (
            <InterestsCard
              drag={isTop}
              key={item.id || index}
              onVote={(result, direction) =>
                handleVote(item, result, direction)
              }
              data={item}
              handleClickPassTicket={handleClickPassTicket}
            />
          );
        })}
      </Frame>
    </>
  );
}
