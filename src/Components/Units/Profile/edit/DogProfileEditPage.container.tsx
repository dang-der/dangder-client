import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import {
  IQuery,
  IQueryFetchMyDogArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_MY_DOG } from "../DogProfilePage.queries";
import { FETCH_CHARACTERS, FETCH_INTERESTS } from "../Init/InitProfile.queries";
import DogProfileEditUI from "./DogProfileEditPage.presenter";

export default function DogProfileEditPage() {
  const [userInfo] = useRecoilState(userInfoState);

  const { data: charactersData } =
    useQuery<Pick<IQuery, "fetchCharacters">>(FETCH_CHARACTERS);

  const { data: interestsData } =
    useQuery<Pick<IQuery, "fetchInterests">>(FETCH_INTERESTS);

  return (
    <DogProfileEditUI
      myDog={userInfo?.dog}
      charactersData={charactersData}
      interestsData={interestsData}
    />
  );
}
