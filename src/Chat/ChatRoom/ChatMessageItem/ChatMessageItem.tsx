import { bool } from "yup";
import * as S from "./ChatMessageItem.styles";
interface ChatMessageItemProps {
  isMine: boolean;
}
export default function ChatMessageItem({ isMine }: ChatMessageItemProps) {
  return (
    <S.Wrapper isMine={isMine}>
      <S.Message isMine={isMine}>
        안녕하세여안녕하세여안녕하세여안녕하세여 안녕하세여 안녕하세여
        안녕하세여 안녕하세여 안녕하세여 안녕하세여 안녕하세여 안녕하세여
        안녕하세여 안녕하세여 안녕하세여 안녕하세여 안녕하세여 안녕하세여
        안녕하세여 안녕하세여 안녕하세여 안녕하세여
      </S.Message>
    </S.Wrapper>
  );
}
