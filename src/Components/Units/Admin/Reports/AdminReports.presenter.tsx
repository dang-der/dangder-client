import { IQuery } from "../../../../Commons/Types/Generated/types";
import * as S from "./AdminReports.styles";

interface AdminReportsProps {
  data: Pick<IQuery, "fetchReports"> | undefined;
}

export default function AdminReportsUI(props: AdminReportsProps) {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TitleIcon />
        <S.Title>신고 내용 관리</S.Title>
      </S.TitleWrapper>
      <S.TableWrapper>
        <S.TableRow>
          <S.ColumnHeaderBasic>유저 이메일</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>신고 내용</S.ColumnHeaderTitle>
        </S.TableRow>
        {props.data?.fetchReports.map((el: any) => (
          <S.Row key={el.id}>
            <S.ColumnBasic>{el.email}</S.ColumnBasic>
            <S.ColumnTitle>{el.reportContent}</S.ColumnTitle>
          </S.Row>
        ))}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
