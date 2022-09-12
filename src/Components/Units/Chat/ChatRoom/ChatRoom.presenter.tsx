import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

import ChatDateDividerItem from "./ChatDateDividerItem/ChatDateDividerItem";
import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";
import * as S from "./ChatRoom.styles";
import { useState } from "react";

export default function ChatRoomUI() {
  const router = useRouter();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onClickSend = (inputs: any) => {
    console.log("onClickSend", inputs);
    reset({
      message: "",
    });
  };

  const onClickPlusIcon = () => {
    setIsOpenMenu((p) => !p);
  };

  const onClickPlaceShare = () => {
    router.push(`${router.asPath}place`);
  };

  const onClickPlanShare = () => {
    router.push(`${router.asPath}plan`);
  };

  return (
    <S.Wrapper>
      <S.ChatHeader>
        <S.OtherDogContainer>
          <S.OtherDogImage src="/favicon.ico" />
          <S.OtherDogName>오전이</S.OtherDogName>
        </S.OtherDogContainer>
      </S.ChatHeader>

      <S.ChatMessagesWrapper>
        {/* todo : 메세지 날짜가 변경되는 부분에서 날짜 구분 컴포넌트 넣어주기 */}
        {Array(10)
          .fill(0)
          .map((e, i) => {
            // todo : 로그인된 사용자 강아지 id랑 아닌 강아지id랑 비교해서 isMine비교
            if (i % 3 === 0) {
              return (
                <>
                  <ChatDateDividerItem date={"0000년 00월 00일"} />
                  <ChatMessageItem isMine={i % 4 === 0} />
                </>
              );
            }
            return <ChatMessageItem key={uuid()} isMine={i % 4 === 0} />;
          })}
      </S.ChatMessagesWrapper>

      <S.ChatInputWrapper isOpen={isOpenMenu}>
        <S.MessageInputWrapper onSubmit={handleSubmit(onClickSend)}>
          <S.IconWrapper onClick={onClickPlusIcon}>
            <AddRoundedIcon />
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
            <S.MenuWrapper onClick={onClickPlaceShare}>
              <S.MenuCircle>
                <img src="/ic_marker_white.svg" />
              </S.MenuCircle>
              <span>장소공유</span>
            </S.MenuWrapper>

            <S.MenuWrapper onClick={onClickPlanShare}>
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
