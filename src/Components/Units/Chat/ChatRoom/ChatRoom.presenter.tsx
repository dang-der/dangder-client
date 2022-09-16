import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Map from "../../../Commons/Map/Map";

import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";
import * as S from "./ChatRoom.styles";
import { useEffect, useRef, useState } from "react";
import { IInfo, IMessage } from "./ChatRoom.container";
import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";

import PlaceShareContainer from "../Place/PlaceShare.container";
import PlanShareContainer from "../Plan/PlanShare.container";
import ChatPlaceItem from "./ChatPlaceItem/ChatPlaceItem";
import ChatPlanItem from "./ChatPlanItem/ChatPlanItem";

interface ChatRoomUIProps {
  handleEmitSend: ({ type, data }: { type: string; data: any }) => void;
  messages: IMessage[];
  myInfo: IInfo | undefined;
}

export default function ChatRoomUI({
  handleEmitSend,
  messages,
  myInfo,
}: ChatRoomUIProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenPlace, setIsOpenPlace] = useState(false);
  const [isOpenPlan, setIsOpenPlan] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const onClickSend = (inputs: any) => {
    console.log("onClickSend", inputs);
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

      <S.ChatHeader>
        <S.OtherDogContainer>
          <S.OtherDogImage src="/favicon.ico" />
          <S.OtherDogName>오전이</S.OtherDogName>
        </S.OtherDogContainer>
      </S.ChatHeader>

      <S.ChatMessagesWrapper>
        {messages.map(({ type, data, dog }: IMessage, i) => {
          if (type === "text")
            return (
              <ChatMessageItem
                key={i}
                message={data.message}
                isMine={dog.id === myInfo?.dog.id}
              />
            );

          if (type === "place")
            return <ChatPlaceItem key={i} dog={dog} data={data} />;
          if (type === "plan")
            return <ChatPlanItem key={i} dog={dog} data={data} />;
          return <S.EnterMessage key={i}>{data.message}</S.EnterMessage>;
        })}
        <div ref={bottomRef}></div>
      </S.ChatMessagesWrapper>

      <S.ChatInputWrapper isOpen={isOpenMenu}>
        <S.MessageInputWrapper onSubmit={handleSubmit(onClickSend)}>
          <S.IconWrapper type="button" onClick={onClickPlusIcon}>
            <S.OpenMenuIconWrapper isOpen={isOpenMenu}>
              <AddRoundedIcon />
            </S.OpenMenuIconWrapper>
          </S.IconWrapper>
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
