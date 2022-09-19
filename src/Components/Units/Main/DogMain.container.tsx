import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  IQuery,
  IQueryFetchAroundDogsArgs,
  IQueryFetchDogsDistanceArgs,
} from "../../../Commons/Types/Generated/types";
import DogMainUI from "./DogMain.presenter";
import {
  FETCH_AROUND_DOG,
  FETCH_DOGS_DISTANCE,
  CREATE_LIKE,
  FETCH_LOGIN_USER_IS_CERT,
} from "./DogMain.queries";
import MatchedModal from "./MatchedModal/MatchedModal";

export default function DogMainContainer() {
  const [userInfo] = useRecoilState(userInfoState);
  const dogId = String(userInfo?.dog?.id);

  const { data } = useQuery<
    Pick<IQuery, "fetchAroundDogs">,
    IQueryFetchAroundDogsArgs
  >(FETCH_AROUND_DOG, {
    variables: { id: dogId, page: 1 },
  });

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

  const [createLike] = useMutation(CREATE_LIKE);

  const onVote = async (
    item: any,
    result: boolean,
    direction: string | undefined
  ) => {
    console.log("DogMainContainer-onVote", item, result, direction);

    try {
      if (direction === "right") {
        const result = await createLike({
          variables: {
            createLikeInput: {
              sendId: dogId,
              receiveId: item[0].id,
            },
          },
        });
        if (result.data.createLike.isMatch) {
          MatchedModal({ sendId: dogId, receiveId: item[0].id });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: isCert } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );

  console.log(isCert);

  return (
    <>
      {data?.fetchAroundDogs && <DogMainUI onVote={onVote} datas={DogsData} />}
    </>
  );
}
