import { Stack } from "../src/Components/Units/test/DogMainPage.container.stack";
import styled from "@emotion/styled";
import { gql, useQuery } from "@apollo/client";
import {
  IDog,
  IQuery,
  IQueryFetchAroundDogsArgs,
} from "../src/Commons/Types/Generated/types";
import { useEffect, useState } from "react";

// 로그인 유저 정보 조회
const FETCH_LOGIN_USER = gql`
  query fetchLoginUser {
    fetchLoginUser {
      id
      dog {
        id
      }
    }
  }
`;

// 주변 강아지 정보 조회
const FETCH_AROUND_DOGS = gql`
  query fetchAroundDogs($id: String!, $page: Float!) {
    fetchAroundDogs(id: $id, page: $page) {
      id
      name
      age
      description
      img {
        img
      }
    }
  }
`;

export default function Main() {
  const [aroundDogsList, setAroundDogsList] = useState<IDog[] | undefined>();
  const [startPage, setStartPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const { data: LoginUserData } =
    useQuery<Pick<IQuery, "fetchLoginUser">>(FETCH_LOGIN_USER);

  const userId = String(LoginUserData?.fetchLoginUser.id);
  const MyDogId = String(LoginUserData?.fetchLoginUser.dog.id);

  const { data: AroundDogsData, refetch } = useQuery<
    Pick<IQuery, "fetchAroundDogs">,
    IQueryFetchAroundDogsArgs
  >(FETCH_AROUND_DOGS, {
    variables: { id: MyDogId, page: 1 },
  });

  useEffect(() => {
    if (!AroundDogsData?.fetchAroundDogs) return;
    setAroundDogsList(AroundDogsData?.fetchAroundDogs);
    console.log("mount: ", AroundDogsData?.fetchAroundDogs);
  }, []);

  useEffect(() => {
    if (!AroundDogsData?.fetchAroundDogs) return;
    setAroundDogsList(AroundDogsData?.fetchAroundDogs);
    console.log("change: ", AroundDogsData?.fetchAroundDogs);
  }, [AroundDogsData]);

  return (
    <Wrapper>
      <DogCardWrapper onVote={(item, vote) => console.log(item.props, vote)}>
        {(AroundDogsData?.fetchAroundDogs || []).map((el: IDog, i) => (
          <Item key={el.id} className="item">
            <DogProfile src="/dog1.jpg" />
            <DogName>{el.name}</DogName>
            <DogAge>{el.age}</DogAge>
            <DogDescription>{el.description}</DogDescription>
          </Item>
        ))}
      </DogCardWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DogCardWrapper = styled(Stack)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const Item = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(576px - 4rem);
  max-width: 576px;
  height: calc(100vh - 17rem);
  @media screen and (max-width: 576px) {
    width: calc(100vw - 4rem);
  }
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

const DogProfile = styled.img`
  width: 100%;
  height: 100%;
  background-color: rebeccapurple;
`;

export const DogName = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 3px;
`;

export const DogAge = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const DogDescription = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;
