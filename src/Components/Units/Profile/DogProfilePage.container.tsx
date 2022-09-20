import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IQuery,
  IQueryFetchMyDogArgs,
} from "../../../Commons/Types/Generated/types";
import DogProfilePageUI from "./DogProfilePage.presenter";
import { FETCH_MY_DOG } from "./DogProfilePage.queries";

export default function DogProfilePage() {
  const [userInfo] = useRecoilState(userInfoState);

  const { data: myDogData } = useQuery<
    Pick<IQuery, "fetchMyDog">,
    IQueryFetchMyDogArgs
  >(FETCH_MY_DOG, {
    variables: { userId: userInfo?.user?.id || "" },
  });

  console.log("MyDogPage", myDogData);

  return <DogProfilePageUI myDogData={myDogData?.fetchMyDog} />;
}
