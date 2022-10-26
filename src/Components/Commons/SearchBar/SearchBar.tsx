import { ChangeEvent, useState } from "react";
import * as S from "./SearchBar.style";

interface ISearchBarProps {
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSearch }: ISearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleClickSearch = () => {
    if (!keyword) return;

    onSearch(keyword);
  };

  return (
    <S.Wrapper>
      <S.InputWrapper
        type="text"
        onChange={handleChangeKeyword}
        placeholder={"장소를 검색해주세요."}
      />
      <S.ButtonWrapper onClick={handleClickSearch}>검색</S.ButtonWrapper>
    </S.Wrapper>
  );
}
