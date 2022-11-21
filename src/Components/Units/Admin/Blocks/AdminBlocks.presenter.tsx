import { IQuery } from "../../../../Commons/Types/Generated/types";
import * as S from "./AdminBlocks.styles";

interface AdminBlockUsersProps {
  page: number;
  data: Pick<IQuery, "fetchBlockUsers"> | undefined;
}

export default function AdminBlocksUI(props: AdminBlockUsersProps) {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TitleIcon />
        <S.Title>차단 유저 관리</S.Title>
      </S.TitleWrapper>
      <S.TableWrapper>
        <S.TableRow>
          <S.ColumnHeaderTitle>유저 이메일</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>차단한 유저 아이디</S.ColumnHeaderBasic>
        </S.TableRow>
        {props.data?.fetchBlockUsers.map((el: any) => (
          <S.Row key={el.id}>
            <S.ColumnTitle id={el.id}>{el.email}</S.ColumnTitle>
            <S.ColumnBasic>{el.blockId}</S.ColumnBasic>
          </S.Row>
        ))}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
