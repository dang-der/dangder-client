import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateLikeArgs,
  IQuery,
  IQueryFetchDogsDistanceArgs,
  IQueryFetchOneDogArgs,
} from "../../../Commons/Types/Generated/types";

import DogDetailUI from "./DogDetail.presenter";
import {
  CREATE_LIKE,
  FETCH_DOG_DISTANCE,
  FETCH_ONE_DOG,
} from "./DogDetail.queries";

export default function DogDetail() {
  const router = useRouter();
  // const [data] = useQuery<Pick<IQuery, "fetchDogsDistance">, IQueryFetchDogsDistanceArgs>(FETCH_DOG_DISTANCE)
  // const [data] = useQuery<Pick<IQuery, "fetchMyDog">, IQueryFetchMyDogArgs>(FETCH_MY_DOG)

  const { data: distanceData } = useQuery<
    Pick<IQuery, "fetchDogsDistance">,
    IQueryFetchDogsDistanceArgs
  >(FETCH_DOG_DISTANCE, {
    variables: { id: String(router.query.dogId) },
  });

  const { data: pickDogData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, {
    variables: { id: String(router.query.dogId) },
  });

  const [createLike] = useMutation<
    Pick<IMutation, "createLike">,
    IMutationCreateLikeArgs
  >(CREATE_LIKE);

  const handleCreateLike = async () => {
    if (typeof router.query.dogId !== "string") return;

    try {
      await createLike({
        variables: {
          createLikeInput: {
            sendId: "1b74199b-2501-48a8-a2b0-5d6c2f004758",
            receivedId: router.query.dogId,
          },
        },
        // refetchQueries: [
        //   {
        //     query: FETCH_ONE_DOG,
        //     variables: {
        //       id: String(router.query.dogId),
        //       // receiveId: router.query.dogId,
        //       // sendId: router.query.dogId,
        //       createLikeInput: { sendId, receivedId },
        //     },
        //   },
        // ],
      });
    } catch (e) {
      console.log("handleClickLikeError", e);
    }
  };

  return (
    // <></>
    <DogDetailUI
      handleCreateLike={handleCreateLike}
      distanceData={distanceData}
      pickDogData={pickDogData}
    />
  );
}
