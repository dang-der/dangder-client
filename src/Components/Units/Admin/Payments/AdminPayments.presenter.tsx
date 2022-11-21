import * as S from "./AdminPayments.styles";
import { IQuery } from "../../../../Commons/Types/Generated/types";
import moment from "moment";
import "moment/locale/ko";

interface AdminPaymentsProps {
  page: number;
  data: Pick<IQuery, "fetchPayments"> | undefined;
}

export default function AdminPaymentsUI(props: AdminPaymentsProps) {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TitleIcon />
        <S.Title>댕더 패스 구매 내역 관리</S.Title>
      </S.TitleWrapper>
      <S.TableWrapper>
        <S.TableRow>
          <S.ColumnHeaderBasic>유저 이메일</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>보유 댕더머니</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>결제 종류</S.ColumnHeaderBasic>
          <S.ColumnHeaderBasic>시작일</S.ColumnHeaderBasic>
        </S.TableRow>
        {props.data?.fetchPayments.map((el: any) => (
          <S.Row key={el.id}>
            <S.ColumnBasic>{el.email}</S.ColumnBasic>
            <S.ColumnTitle id={el.id}>{el.payMoney}</S.ColumnTitle>
            <S.ColumnBasic>{el.paymentType}</S.ColumnBasic>
            {moment(el.createdAt, "YYYYMMDD hh:mm a").format("YYYY.MM.DD")}
          </S.Row>
        ))}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
