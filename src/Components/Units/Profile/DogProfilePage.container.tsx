import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchDogImageArgs,
  IQueryFetchMyDogArgs,
} from "../../../Commons/Types/Generated/types";
import DogProfilePageUI from "./DogProfilePage.presenter";
import { FETCH_MY_DOG, FETCH_DOG_IMAGE } from "./DogProfilePage.queries";

export default function DogProfilePage() {
  const { data: MyDogData } = useQuery<
    Pick<IQuery, "fetchMyDog">,
    IQueryFetchMyDogArgs
  >(FETCH_MY_DOG, {
    variables: { userId: "5fa492f0-4fb4-4c32-9454-fbc6aab34704" },
  });

  const { data: MyDogImage } = useQuery<
    Pick<IQuery, "fetchDogImage">,
    IQueryFetchDogImageArgs
  >(FETCH_DOG_IMAGE);

  return (
    <DogProfilePageUI
      MyDogData={MyDogData?.fetchMyDog}
      MyDogImage={MyDogImage}
    />
  );
}
