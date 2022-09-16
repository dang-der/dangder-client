import { useApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchMyDogArgs,
} from "../../../Commons/Types/Generated/types";
import DogProfilePageUI from "./DogProfilePage.presenter";
import { FETCH_LOGIN_USER, FETCH_MY_DOG } from "./DogProfilePage.queries";

export default function DogProfilePage() {
  const router = useRouter();
  const client = useApolloClient();

  // const { data } = await client.query({ query:s FETCH_LOGIN_USER });

  // if (!data) return;

  const { data: MyDogData } = useQuery<
    Pick<IQuery, "fetchMyDog">,
    IQueryFetchMyDogArgs
  >(FETCH_MY_DOG, {
    variables: { userId: "5fa492f0-4fb4-4c32-9454-fbc6aab34704" },
  });

  return <DogProfilePageUI MyDogData={MyDogData?.fetchMyDog} />;
}
