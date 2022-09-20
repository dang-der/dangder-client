import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import {
  IQuery,
  IQueryFetchMyDogArgs,
} from "../../../../Commons/Types/Generated/types";
import { FETCH_MY_DOG } from "../DogProfilePage.queries";
import DogProfileEditUI from "./DogProfileEditPage.presenter";

export default function DogProfileEditPage() {
  const [userInfo] = useRecoilState(userInfoState);

  const { data: myDogData } = useQuery<
    Pick<IQuery, "fetchMyDog">,
    IQueryFetchMyDogArgs
  >(FETCH_MY_DOG, {
    variables: { userId: userInfo?.user?.id || "" },
  });

  return <DogProfileEditUI myDog={myDogData?.fetchMyDog} />;
}
