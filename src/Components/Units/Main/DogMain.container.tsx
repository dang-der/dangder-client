import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchAroundDogsArgs,
} from "../../../Commons/Types/Generated/types";
import DogMainUI from "./DogMain.presenter";
import { FETCH_AROUND_DOG } from "./DogMain.queries";

export default function DogMainContainer() {
  //   const [userInfo] = useRecoilState(userInfoState);

  const { data } = useQuery<
    Pick<IQuery, "fetchAroundDogs">,
    IQueryFetchAroundDogsArgs
  >(FETCH_AROUND_DOG, {
    variables: { id: "b118e915-e11e-46fa-9033-e745d6a99440", page: 1 },
  });

  console.log("MainDogContainer", data);

  const onVote = (
    item: any,
    result: boolean,
    direction: string | undefined
  ) => {
    console.log("DogMainContainer-onVote", item, result, direction);
  };
  return (
    <>
      {data?.fetchAroundDogs && (
        <DogMainUI onVote={onVote} datas={data?.fetchAroundDogs} />
      )}
    </>
  );
}
