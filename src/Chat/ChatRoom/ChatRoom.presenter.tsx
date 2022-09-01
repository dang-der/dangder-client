import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ChatDateDividerItem from "./ChatDateDividerItem/ChatDateDividerItem";
import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";
import * as S from "./ChatRoom.styles";

export default function ChatRoomUI() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const onClickSend = (inputs: any) => {
    console.log("onClickSend", inputs);
    reset({
      message: "",
    });
  };

  const onClickBackArrow = () => {
    router.back();
  };

  return (
    <S.Wrapper>
      <S.ChatHeader>
        <S.BackArrow onClick={onClickBackArrow}>👈🏼</S.BackArrow>
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
      <S.ChatInputWrapper onSubmit={handleSubmit(onClickSend)}>
        <S.MessageInput {...register("message")} />
        <S.SendButton>전송</S.SendButton>
      </S.ChatInputWrapper>
    </S.Wrapper>
  );
}
