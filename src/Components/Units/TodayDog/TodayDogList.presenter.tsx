import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IDog,
  IInterestCategoryOutput,
  IQuery,
  ITodayLikeDogOutput,
} from "../../../Commons/Types/Generated/types";
import TodayDogNonePage from "../../Commons/NonePage/TodayDogNonePage/TodayDogNonePage";
import * as S from "./TodayDogList.styles";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

interface TodayDogListUIProps {
  todayDogData: Pick<IQuery, "fetchTodayDog"> | undefined;
  handleJoinChatRoom: (pairDogId: string) => Promise<void>;
  interestCategoryData: Pick<IQuery, "fetchInterestCategory"> | undefined;
}

export default function TodayDogListUI({
  todayDogData,
  handleJoinChatRoom,
  interestCategoryData,
}: TodayDogListUIProps) {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onClickMoveDogDetail =
    (dogId: string) => (event: MouseEvent<HTMLDivElement>) => {
      if (!(event.target instanceof HTMLDivElement)) return;
      router.push(`/${dogId}`);
    };

  const onClickPass = (dogId: string) => {
    handleJoinChatRoom(dogId);
  };

  const onClickInterests =
    (interest: string, chatRoomId: string) =>
    (event: MouseEvent<HTMLDivElement>) => {
      router.push(`/interests?interest=${interest}&id=${chatRoomId}`);
    };

  return (
    <S.Wrapper>
      <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered>
              <Tab label="오늘의 댕댕이" value="1" />
              <Tab label="댕댕이 관심사" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                        imageUrl={
                          "https://storage.googleapis.com/" +
                            e.mainImg.replace(" ", "%20") || ""
                        }
                      />
                      {userInfo?.user && (
                        <S.ListFunctionIconWrapper>
                          <S.ListFunctionMoveChat
                            onClick={() => onClickPass(e.id)}
                            // src={todayDogData?.fetchTodayDog.mainImg}
                            src="/passIcon.png"
                          />
                        </S.ListFunctionIconWrapper>
                      )}
                      <S.ListInfo>
                        <S.ListName>{e.name},</S.ListName>
                        <S.ListAge>{e.age}</S.ListAge>
                      </S.ListInfo>
                    </S.ListImageWrapper>
                  </S.ListWrapper>
                );
              })
            ) : (
              <TodayDogNonePage />
            )}
          </TabPanel>
          <TabPanel value="2">
            <S.Wrapper>
              {interestCategoryData ? (
                interestCategoryData?.fetchInterestCategory.map(
                  (e: IInterestCategoryOutput) => {
                    console.log("categoryDogs", e);
                    return (
                      <S.InterestWrapper key={e.interest}>
                        <S.InterestsImageWrapper
                          id={e.interest}
                          onClick={onClickInterests(e.interest, e.iChatRoomId)}
                        >
                          <S.InterestGradientBox
                            imageUrl={
                              "https://storage.googleapis.com/" +
                                e.interestImg.replace(" ", "%20") || ""
                            }
                          />
                          <S.InterestInfo>
                            <S.InterestTitle>{e.title}</S.InterestTitle>
                            <S.InterestBottom>
                              <S.InterestSubTitle>
                                {e.subTitle}
                              </S.InterestSubTitle>
                              <S.InterestName>{e.interest}</S.InterestName>
                            </S.InterestBottom>
                          </S.InterestInfo>
                        </S.InterestsImageWrapper>
                      </S.InterestWrapper>
                    );
                  }
                )
              ) : (
                <></>
              )}
            </S.Wrapper>
          </TabPanel>
        </TabContext>
      </Box>
    </S.Wrapper>
  );
}