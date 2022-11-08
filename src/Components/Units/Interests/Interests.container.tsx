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
  IQueryFetchCategoryDogsArgs,
} from "../../../Commons/Types/Generated/types";
import { CREATE_LIKE, FETCH_LOGIN_USER_IS_CERT } from "./Interests.queries";
import MatchedModal from "./MatchedModal/MatchedModal";
import {
  FETCH_CATEGORY_DOGS,
  JOIN_CHAT_ROOM,
} from "../TodayDog/TodayDogList.queries";
import InterestsUI from "./Interests.presenter";
import { useRouter } from "next/router";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

export default function InterestsContainer() {
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

  const { data: dogs, refetch } = useQuery<
    Pick<IQuery, "fetchCategoryDogs">,
    IQueryFetchCategoryDogsArgs
  >(FETCH_CATEGORY_DOGS, {
    variables: { interest: String(router.query.interest) },
  });

  const [createLike] = useMutation<
    Pick<IMutation, "createLike">,
    IMutationCreateLikeArgs
  >(CREATE_LIKE);

  const { data: loginUserIsCert } = useQuery<
    Pick<IQuery, "fetchLoginUserIsCert">
  >(FETCH_LOGIN_USER_IS_CERT);

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

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

  const handleClickPassTicket = async (pairId: string) => {
    setSelectedId(pairId);
    checkIsCert(pairId);
  };

  const checkIsCert = async (id: string) => {
    if (!loginUserIsCert?.fetchLoginUserIsCert) {
      setBuyPassModalVisible(true);
      return;
    }

    handleJoinChatRoom(id);
  };

  const handleJoinChatRoom = async (id?: string) => {
    try {
      const { data: joinChatRoomData } = await joinChatRoom({
        variables: {
          dogId: userInfo?.dog?.id || "",
          chatPairId: id || selectedId,
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

  const handleClickChat = () => {
    router.push(
      `/interests/chat/${String(router.query.id) || ""}?interest=${String(
        router.query.interest
      )}`
    );
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
      <InterestsUI
        onVote={onVote}
        datas={dogs?.fetchCategoryDogs}
        refetch={refetch}
        handleClickPassTicket={handleClickPassTicket}
        handleClickChat={handleClickChat}
      />
    </>
  );
}
