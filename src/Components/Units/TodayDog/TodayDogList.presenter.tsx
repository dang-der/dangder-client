import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IQuery,
  ITodayLikeDogOutput,
} from "../../../Commons/Types/Generated/types";
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
}

export default function TodayDogListUI({
  todayDogData,
  handleJoinChatRoom,
}: TodayDogListUIProps) {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  console.log("TodayDogListUI", todayDogData);

  const onClickMoveDogDetail =
    (dogId: string) => (event: MouseEvent<HTMLDivElement>) => {
      if (!(event.target instanceof HTMLDivElement)) return;
      router.push(`/${dogId}`);
    };

  const onClickPass = (dogId: string) => {
    handleJoinChatRoom(dogId);
  };

  const onClickInterests = () => {
    router.push(`/interests`);
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
              <></>
            )}
          </TabPanel>
          <TabPanel value="2">
            <S.Wrapper>
              <S.InterestWrapper>
                <S.InterestsImageWrapper onClick={onClickInterests}>
                  <S.InterestPlayGradientBox />
                  <S.InterestInfo>
                    <S.InterestTitle>나랑 공놀이 할래?</S.InterestTitle>
                    <S.InterestBottom>
                      <S.InterestSubTitle>
                        어떤 공이 취향이니?
                      </S.InterestSubTitle>
                      <S.InterestName>공놀이</S.InterestName>
                    </S.InterestBottom>
                  </S.InterestInfo>
                </S.InterestsImageWrapper>
              </S.InterestWrapper>
              <S.InterestWrapper>
                <S.InterestsImageWrapper>
                  <S.InterestWalkGradientBox />
                  <S.InterestInfo>
                    <S.InterestTitle>산책하고 싶어!</S.InterestTitle>
                    <S.InterestBottom>
                      <S.InterestSubTitle>
                        산책메이트 소개해줄게!
                      </S.InterestSubTitle>
                      <S.InterestName>산책</S.InterestName>
                    </S.InterestBottom>
                  </S.InterestInfo>
                </S.InterestsImageWrapper>
              </S.InterestWrapper>
              <S.InterestWrapper>
                <S.InterestsImageWrapper>
                  <S.InterestCafeGradientBox />
                  <S.InterestInfo>
                    <S.InterestTitleOne>
                      요즘 핫한 카페
                      <br />
                      같이 갈 댕댕이
                    </S.InterestTitleOne>
                    <S.InterestBottom>
                      <S.InterestSubTitle>
                        같은 카페에 가는 댕댕이
                        <br />
                        구함!
                      </S.InterestSubTitle>
                      <S.InterestName>애견카페</S.InterestName>
                    </S.InterestBottom>
                  </S.InterestInfo>
                </S.InterestsImageWrapper>
              </S.InterestWrapper>
              <S.InterestWrapper>
                <S.InterestsImageWrapper>
                  <S.InterestEatGradientBox />
                  <S.InterestInfo>
                    <S.InterestTitleOne>
                      먹는게 세상에서
                      <br />
                      제일 좋아!
                    </S.InterestTitleOne>
                    <S.InterestBottom>
                      <S.InterestSubTitle>
                        친환경 사료 못참지!
                        <br />
                        개껌 양보할 수 없어!
                      </S.InterestSubTitle>
                      <S.InterestName>먹거리</S.InterestName>
                    </S.InterestBottom>
                  </S.InterestInfo>
                </S.InterestsImageWrapper>
              </S.InterestWrapper>
              <S.InterestWrapper>
                <S.InterestsImageWrapper>
                  <S.InterestBouncyGradientBox />
                  <S.InterestInfo>
                    <S.InterestTitleTwo>세상 활발해!</S.InterestTitleTwo>
                    <S.InterestBottom>
                      <S.InterestSubTitle>
                        여기서 지칠 수 없지!
                        <br />
                        내가 제일 활발해!
                      </S.InterestSubTitle>
                      <S.InterestName>활발한</S.InterestName>
                    </S.InterestBottom>
                  </S.InterestInfo>
                </S.InterestsImageWrapper>
              </S.InterestWrapper>
              <S.InterestWrapper>
                <S.InterestsImageWrapper>
                  <S.InterestTimidGradientBox />
                  <S.InterestInfo>
                    <S.InterestTitleTwo>조용하고 소심한</S.InterestTitleTwo>
                    <S.InterestBottom>
                      <S.InterestSubTitle>
                        조용하고 소심한 댕댕이
                        <br />나 말고 또 있을까?
                      </S.InterestSubTitle>
                      <S.InterestName>소심한</S.InterestName>
                    </S.InterestBottom>
                  </S.InterestInfo>
                </S.InterestsImageWrapper>
              </S.InterestWrapper>
            </S.Wrapper>
          </TabPanel>
        </TabContext>
      </Box>
    </S.Wrapper>
  );
}
