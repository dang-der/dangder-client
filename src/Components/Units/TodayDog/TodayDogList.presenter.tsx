import { useRouter } from "next/router";
import { MouseEvent } from "react";
import {
  IQuery,
  ITodayLikeDogOutput,
} from "../../../Commons/Types/Generated/types";
import * as S from "./TodayDogList.styles";

interface TodayDogListUIProps {
  todayDogData: Pick<IQuery, "fetchTodayDog"> | undefined;
  handleJoinChatRoom: (pairDogId: string) => Promise<void>;
}

export default function TodayDogListUI({
  todayDogData,
  handleJoinChatRoom,
}: TodayDogListUIProps) {
  const router = useRouter();

  console.log("TodayDogListUI", todayDogData);

  const onClickMoveDogDetail =
    (dogId: string) => (event: MouseEvent<HTMLDivElement>) => {
      if (!(event.target instanceof HTMLDivElement)) return;
      router.push(`/${dogId}`);
    };

  const onClickPass = (dogId: string) => {
    handleJoinChatRoom(dogId);
  };

  return (
    <S.Wrapper>
      {todayDogData ? (
        todayDogData?.fetchTodayDog.map((e: ITodayLikeDogOutput) => {
          console.log("todayDog", e);
          return (
            <S.ListWrapper key={e.id}>
              <S.ListImageWrapper
                id={e.id}
                onClick={onClickMoveDogDetail(e.id)}
              >
                <S.GradientBox
                  imageUrl={"https://storage.googleapis.com/" + e.mainImg || ""}
                  // style={{
                  //   backgroundImage: `url(${
                  //     "https://storage.googleapis.com/" +
                  //       todayDogData?.fetchTodayDog.mainImg[0] || ""
                  //   })`,
                  // }}
                />
                {/* <S.ListImage
                  style={{
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundImage: `url(${
                      "https://storage.googleapis.com/" + e.mainImg || ""
                    })`,
                  }}
                /> */}
                {/* <S.ListImage src={todayDogData?.fetchTodayDog.mainImg}></S.ListImage> */}
                <S.ListFunctionIconWrapper>
                  <S.ListFunctionMoveChat
                    onClick={() => onClickPass(e.id)}
                    // src={todayDogData?.fetchTodayDog.mainImg}
                    src="/passIcon.png"
                  />
                </S.ListFunctionIconWrapper>
                <S.ListInfo>
                  <S.ListName>{e.name},</S.ListName>
                  <S.ListAge>{e.age}</S.ListAge>
                </S.ListInfo>
              </S.ListImageWrapper>
              {/* <S.ListFunctionIconWrapper>
                <S.ListFunctionMoveChat
                  onClick={onClickPass}
                  // src={todayDogData?.fetchTodayDog.mainImg}
                  src="/passIcon.png"
                />
              </S.ListFunctionIconWrapper>
              <S.ListInfo>
                <S.ListName>{e.name},</S.ListName>
                <S.ListAge>{e.age}</S.ListAge>
              </S.ListInfo> */}
            </S.ListWrapper>
          );
        })
      ) : (
        <></>
      )}
    </S.Wrapper>
  );
}
