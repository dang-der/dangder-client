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
  IQueryFetchCategoryDogsArgs,
  IQueryFetchDogsArgs,
} from "../../../Commons/Types/Generated/types";
import DogMainUI from "./Interests.presenter";
import {
  CREATE_LIKE,
  FETCH_CATEGORY_DOGS,
  FETCH_DOGS,
  FETCH_INTEREST_CATEGORY,
} from "./Interests.queries";
import MatchedModal from "./MatchedModal/MatchedModal";

export default function InterestsContainer() {
  const [matchedId, setMatchedId] = useState<string>("");
  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [matchedModalVisible, setMatchedModalVisible] = useRecoilState(
    matchedModalVisibleState
  );

  const dogId = String(userInfo?.dog?.id);

  const { data: interestCategoryData, refetch } = useQuery<
    Pick<IQuery, "fetchInterestCategory">
  >(FETCH_INTEREST_CATEGORY, { variables: { interest: dogId } });

  // const { data, refetch } = useQuery<
  //   Pick<IQuery, "fetchCategoryDogs">,
  //   IQueryFetchCategoryDogsArgs
  // >(FETCH_CATEGORY_DOGS, {
  //   variables: { interest: dogId },
  // });

  const { data: fetchDogs, refetch: nonRefetch } = useQuery<
    Pick<IQuery, "fetchDogs">,
    IQueryFetchDogsArgs
  >(FETCH_DOGS, {
    variables: { page: 1 },
  });

  const nonDogsData = fetchDogs?.fetchDogs.map((el) => [el]);

  const DogsData = interestCategoryData?.fetchInterestCategory.map(() => []);

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
  console.log(interestCategoryData);

  return (
    <>
      <BuyPassTicketModal />
      {matchedModalVisible && <MatchedModal receiveId={matchedId} />}

      {userInfo !== undefined
        ? interestCategoryData?.fetchInterestCategory && (
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
