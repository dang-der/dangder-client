import { useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchDogsBySearchArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_DOGS_BY_SEARCH } from "./AdminDogs.queries";
import * as S from "./AdminDogs.styles";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

interface AdminDogsProps {
  page: number;
  data: Pick<IQuery, "fetchDogs"> | undefined;
}

export default function AdminDogsUI(props: AdminDogsProps) {
  const [keyword, setKeyword] = useState<string>("");

  const { data: adminDogsBySearchData } = useQuery<
    Pick<IQuery, "fetchDogsBySearch">,
    IQueryFetchDogsBySearchArgs
  >(FETCH_DOGS_BY_SEARCH, {
    variables: { search: keyword },
  });

  console.log(adminDogsBySearchData);

  const getDebounce = _.debounce((value: string) => {
    onChangeKeyword(value);
  }, 200);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  const onChangeDogs = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TitleIcon />
        <S.Title>댕댕이 관리</S.Title>
      </S.TitleWrapper>
      <S.TableWrapper>
        <S.TableRow>
          <S.ColumnHeaderBasic>유저 이메일</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>이름</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>나이</S.ColumnHeaderBasic>
          <S.ColumnHeaderBasic>성별</S.ColumnHeaderBasic>
        </S.TableRow>
        {props.data?.fetchDogs.map((el: any) => (
          <S.Row key={el.id}>
            <S.ColumnBasic>{el.user.email}</S.ColumnBasic>
            <S.ColumnTitle>
              {el.name
                .replaceAll(keyword, `@#$%${keyword}@#$%`)
                .split("@#$%")
                .map((el: any) => (
                  <S.FindKeyword key={uuidv4()} isSearch={keyword === el}>
                    {el}
                  </S.FindKeyword>
                ))}
            </S.ColumnTitle>
            <S.ColumnBasic id={el.id}>{el.age}살</S.ColumnBasic>
            <S.ColumnBasic>{el.gender}</S.ColumnBasic>
          </S.Row>
        ))}
      </S.TableWrapper>
      <S.SearchWrapper>
        <S.SearchBarIcon />
        <S.SearchBar
          placeholder="검색할 댕댕이를 입력해 주세요."
          onChange={onChangeDogs}
        />
      </S.SearchWrapper>
    </S.Wrapper>
  );
}
