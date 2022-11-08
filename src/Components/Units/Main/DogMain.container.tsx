import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import {
  exceptionModalState,
  matchedModalVisibleState,
  passBuyModalVisibleState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateLikeArgs,
  IMutationJoinChatRoomArgs,
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
  FETCH_LOGIN_USER_IS_CERT,
} from "./DogMain.queries";
import MatchedModal from "./MatchedModal/MatchedModal";
import { JOIN_CHAT_ROOM } from "../Detail/DogDetail.queries";
import { useRouter } from "next/router";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

export default function DogMainContainer() {
  const router = useRouter();

  const [matchedId, setMatchedId] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [, setBuyPassModalVisible] = useRecoilState(passBuyModalVisibleState);
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

  const { data: loginUserIsCert } = useQuery<
    Pick<IQuery, "fetchLoginUserIsCert">
  >(FETCH_LOGIN_USER_IS_CERT);

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  const onClickPassTicket = async (pairId: string) => {
    setSelectedId(pairId);
    checkIsCert(pairId);
  };

  const checkIsCert = async (pairId: string) => {
    if (!loginUserIsCert?.fetchLoginUserIsCert) {
      setBuyPassModalVisible(true);
      return;
    }

    handleJoinChatRoom(pairId);
  };

  const handleJoinChatRoom = async (pairId?: string) => {
    try {
      const { data: joinChatRoomData } = await joinChatRoom({
        variables: {
          dogId: userInfo?.dog?.id || "",
          chatPairId: pairId || selectedId,
        },
      });

      if (!joinChatRoomData?.joinChatRoom.id) {
        throw Error("채팅방 입장 실패");
      }
      router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
    } catch (e) {
      console.log("handleJoinChatRoomError", e);
    }
  };

  return (
    <>
      <BuyPassTicketModal
        title="먼저 말을 걸기 위해서 <br />
            댕더 패스 구매가 필요해요!
            <br />"
        icon={<CampaignRoundedIcon />}
        redirectUrl="https://dangder.shop:3000/chat"
        onSuccess={handleJoinChatRoom}
      />
      {matchedModalVisible && <MatchedModal receiveId={matchedId} />}
      {userInfo !== undefined
        ? data?.fetchAroundDogs &&
          dogsDistanceData?.fetchDogsDistance && (
            <DogMainUI
              onVote={onVote}
              datas={DogsData}
              refetch={refetch}
              handleClickBuyTicket={onClickPassTicket}
            />
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
