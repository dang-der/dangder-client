import * as S from "./AdminUsers.styles";
import { useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchUsersArgs,
  IQueryFetchUsersBySearchArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_USERS, FETCH_USERS_BY_SEARCH } from "./AdminUsers.queries";
import moment from "moment";
import "moment/locale/ko";
import _ from "lodash";

export default function AdminUsersUI() {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const { data } = useQuery<Pick<IQuery, "fetchUsers">, IQueryFetchUsersArgs>(
    FETCH_USERS,
    {
      variables: { page },
    }
  );

  const { data: fetchUsersBySearchData } = useQuery<
    Pick<IQuery, "fetchUsersBySearch">,
    IQueryFetchUsersBySearchArgs
  >(FETCH_USERS_BY_SEARCH, {
    variables: { search: keyword },
  });

  console.log(fetchUsersBySearchData);

  const getDebounce = _.debounce((value: string) => {
    onChangeKeyword(value);
  }, 200);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  const onChangeUsers = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TitleIcon />
        <S.Title>유저 관리</S.Title>
      </S.TitleWrapper>
      <S.TableWrapper>
        <S.TableRow>
          <S.ColumnHeaderBasic>이메일</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>펫 여부</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>계정 생성일</S.ColumnHeaderBasic>
          <S.ColumnHeaderBasic>신고 누적 수</S.ColumnHeaderBasic>
        </S.TableRow>
        {data?.fetchUsers.map((el) => (
          <S.Row key={el.id}>
            <S.ColumnBasic>{el.email}</S.ColumnBasic>
            <S.ColumnTitle id={el.id}>
              {el.pet ? "true" : "false"}
            </S.ColumnTitle>
            <S.ColumnBasic>
              {moment(el.createdAt, "YYYYMMDD hh:mm a").format("YYYY.MM.DD")}
            </S.ColumnBasic>
            <S.ColumnBasic>
              {el.reportCnt ? el.reportCnt + "회" : "-"}
            </S.ColumnBasic>
          </S.Row>
        ))}
      </S.TableWrapper>
      <S.SearchWrapper>
        <S.SearchBarIcon />
        <S.SearchBar
          placeholder="검색할 유저를 입력해 주세요."
          onChange={onChangeUsers}
        />
      </S.SearchWrapper>
    </S.Wrapper>
  );
}
