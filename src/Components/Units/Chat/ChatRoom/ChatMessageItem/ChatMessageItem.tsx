import { bool } from "yup";
import * as S from "./ChatMessageItem.styles";
interface ChatMessageItemProps {
  isMine: boolean;
  message: string;
}
export default function ChatMessageItem({
  isMine,
  message,
}: ChatMessageItemProps) {
  return (
    <S.Wrapper isMine={isMine}>
      <S.Message isMine={isMine}>{message}</S.Message>
    </S.Wrapper>
  );
}
