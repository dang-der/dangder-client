
import { useForm } from "react-hook-form";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";


import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";
import * as S from "./ChatRoom.styles";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "./ChatRoom.container";
import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";

import PlaceShareContainer from "../Place/PlaceShare.container";
import PlanShareContainer from "../Plan/PlanShare.container";
import ChatPlaceItem from "./ChatPlaceItem/ChatPlaceItem";
import ChatPlanItem from "./ChatPlanItem/ChatPlanItem";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";

import { v4 as uuid } from "uuid";
import { IDog, IQuery } from "../../../../Commons/Types/Generated/types";

interface ChatRoomUIProps {
  isGroupChat: boolean;
  messages: IMessage[] | undefined;
  pairDog: IDog | undefined;
  handleEmitSend: ({ type, data }: { type: string; data: any }) => void;
}

export default function ChatRoomUI({
  handleEmitSend,
  messages,
  pairDog,
  isGroupChat,
}: ChatRoomUIProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenPlace, setIsOpenPlace] = useState(false);
  const [isOpenPlan, setIsOpenPlan] = useState(false);
  const [userInfo] = useRecoilState(userInfoState);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const onClickSend = (inputs: any) => {
    handleEmitSend({ type: "text", data: { message: inputs.message } });
    reset({
      message: "",
    });
  };

  const onClickPlusIcon = () => {
    setIsOpenMenu((p) => !p);
  };

  const togglePlaceShare = () => {
    setIsOpenPlace((p) => !p);
  };

  const togglePlanShare = () => {
    setIsOpenPlan((p) => !p);
  };

  const messageComponents = messages?.map(
    ({ type, data, dog }: IMessage, i) => {
      if (userInfo) {
        if (type === "text")
          return (
            <ChatMessageItem
              key={uuid()}
              message={data?.message}
              isMine={dog?.id?.includes(String(userInfo?.dog?.id))}
            />
          );

        if (type === "place")
          return <ChatPlaceItem key={uuid()} dog={dog} data={data} />;
        if (type === "plan")
          return <ChatPlanItem key={uuid()} dog={dog} data={data} />;
        return <></>;
      }
    }
  );

  return (
    <S.Wrapper>
      {isOpenPlace && (
        <DimWrapper>
          <PlaceShareContainer
            handleEmitSend={handleEmitSend}
            toggleModal={togglePlaceShare}
          />
        </DimWrapper>
      )}

      {isOpenPlan && (
        <DimWrapper>
          <PlanShareContainer
            handleEmitSend={handleEmitSend}
            toggleModal={togglePlanShare}
          />
        </DimWrapper>
      )}

      {!isGroupChat && (
        <S.ChatHeader>
          <S.OtherDogContainer>
            <S.OtherDogImage
              src={
                "https://storage.googleapis.com/" +
                  pairDog?.img.filter((e) => e.isMain)?.[0]?.img || "/pug.jpg"
              }
            />
            <S.OtherDogName>{pairDog?.name}</S.OtherDogName>
          </S.OtherDogContainer>
        </S.ChatHeader>
      )}

      <S.ChatMessagesWrapper>
        {messages && messageComponents}
        <div ref={bottomRef}></div>
      </S.ChatMessagesWrapper>

      <S.ChatInputWrapper isOpen={isOpenMenu}>
        <S.MessageInputWrapper onSubmit={handleSubmit(onClickSend)}>
          {!isGroupChat && (
            <S.IconWrapper type="button" onClick={onClickPlusIcon}>
              <S.OpenMenuIconWrapper isOpen={isOpenMenu}>
                <AddRoundedIcon />
              </S.OpenMenuIconWrapper>
            </S.IconWrapper>
          )}

          <S.MessageInput
            {...register("message")}
            placeholder="메세지를 입력해주세요."
          />
          <S.IconWrapper>
            <SendRoundedIcon />
          </S.IconWrapper>
        </S.MessageInputWrapper>

        {isOpenMenu && (
          <S.BottomMenuContainerWrapper>
            <S.MenuWrapper onClick={togglePlaceShare}>
              <S.MenuCircle>
                <img src="/ic_marker_white.svg" />
              </S.MenuCircle>
              <span>장소공유</span>
            </S.MenuWrapper>

            <S.MenuWrapper onClick={togglePlanShare}>
              <S.MenuCircle>
                <CalendarMonthRoundedIcon />
              </S.MenuCircle>
              <span>일정공유</span>
            </S.MenuWrapper>
          </S.BottomMenuContainerWrapper>
        )}
      </S.ChatInputWrapper>
    </S.Wrapper>
  );
}
