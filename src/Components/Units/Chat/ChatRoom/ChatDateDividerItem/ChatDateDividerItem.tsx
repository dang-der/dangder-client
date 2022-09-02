import * as S from "./ChatDateDividerItem.styles";
interface ChatDateDividerItemProps {
  date: string;
}
export default function ChatDateDividerItem({
  date,
}: ChatDateDividerItemProps) {
  return <S.Wrapper>{date}</S.Wrapper>;
}
