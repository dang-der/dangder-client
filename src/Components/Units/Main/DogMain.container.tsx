import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import {
  exceptionModalState,
  matchedModalVisibleState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateLikeArgs,
  IQuery,
  IQueryFetchAroundDogsArgs,
  IQueryFetchDogsArgs,
  IQueryFetchDogsDistanceArgs,
} from "../../../Commons/Types/Generated/types";
import DogMainUI from "./DogMain.presenter";
import {
  FETCH_AROUND_DOG,
  FETCH_DOGS_DISTANCE,
  CREATE_LIKE,
  FETCH_DOGS,
} from "./DogMain.queries";
import MatchedModal from "./MatchedModal/MatchedModal";

export default function DogMainContainer() {
  const [matchedId, setMatchedId] = useState<string>("");
  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [matchedModalVisible, setMatchedModalVisible] = useRecoilState(
    matchedModalVisibleState
  );

  const dogId = String(userInfo?.dog?.id);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchAroundDogs">,
    IQueryFetchAroundDogsArgs
  >(FETCH_AROUND_DOG, {
    variables: { id: dogId, page: 1 },
  });

  const { data: fetchDogs, refetch: nonRefetch } = useQuery<
    Pick<IQuery, "fetchDogs">,
    IQueryFetchDogsArgs
  >(FETCH_DOGS, {
    variables: { page: 1 },
  });

  const nonDogsData = fetchDogs?.fetchDogs.map((el) => [el]);
  console.log("DogMainContainer - nonDogsData", nonDogsData);
  console.log("DogMainContainer - data", data);

  const { data: dogsDistanceData } = useQuery<
    Pick<IQuery, "fetchDogsDistance">,
    IQueryFetchDogsDistanceArgs
  >(FETCH_DOGS_DISTANCE, {
    variables: { id: dogId },
  });

  const DogsData = data?.fetchAroundDogs.map((el, i) => [
    el,
    dogsDistanceData?.fetchDogsDistance[i],
  ]);

  const [createLike] = useMutation<
    Pick<IMutation, "createLike">,
    IMutationCreateLikeArgs
  >(CREATE_LIKE);

  const onVote = async (
    item: any,
    result: boolean,
    direction: string | undefined
  ) => {
    console.log("DogMainContainer-onVote", item, result, direction);

    try {
      if (direction === "right") {
        if (userInfo === undefined) {
          setExceptionModal({
            visible: true,
            message: "비회원은 좋아요를 할 수 없습니다.",
          });
          return;
        }
        const { data: createLikeData } = await createLike({
          variables: {
            createLikeInput: {
              sendId: dogId,
              receiveId: item[0].id,
            },
          },
        });

        if (createLikeData?.createLike.isMatch) {
          setMatchedModalVisible(true);
          setMatchedId(createLikeData.createLike.receiveId);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setExceptionModal({ visible: true, message: error.message });
      }
    }
  };

  return (
    <>
      <BuyPassTicketModal />
      {matchedModalVisible && <MatchedModal receiveId={matchedId} />}
      
      {userInfo !== undefined
        ? data?.fetchAroundDogs &&
          dogsDistanceData?.fetchDogsDistance && (
            <DogMainUI onVote={onVote} datas={DogsData} refetch={refetch} />
          )
        : nonDogsData && (
            <DogMainUI
              onVote={onVote}
              datas={nonDogsData}
              nonRefetch={nonRefetch}
            />
          )}
    </>
  );
}
