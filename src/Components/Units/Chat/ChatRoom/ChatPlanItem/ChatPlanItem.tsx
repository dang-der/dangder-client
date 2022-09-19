import styled from "@emotion/styled";

import moment from "moment";
import "moment/locale/ko";
import { Gray76 } from "../../../../../../styles/GlobalStyles";

interface ChatPlanItemProps {
  dog: any;
  data: { meetAt: string } | any;
}

const Wrapper = styled.div`
  width: 100%;
  color: ${Gray76};
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  margin: 1.5rem 0;
`;

export default function ChatPlanItem({ dog, data }: ChatPlanItemProps) {
  return (
    <>
      <Wrapper>
        {dog.name}님이{" "}
        {moment(data.meetAt, "YYYYMMDD hh:mm a").format(
          "YYYY년 MM월 DD일 a hh:mm"
        )}{" "}
        에 약속을 설정했습니다.
        <br />
        즐거운 댕더 라이프 되세요.🐾
      </Wrapper>
    </>
  );
}
