
import { Maybe } from "graphql/jsutils/Maybe";
import * as S from "./ChatMessageItem.styles";
interface ChatMessageItemProps {
  isMine: boolean | undefined;
  message: string | undefined | Maybe<string>;
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
