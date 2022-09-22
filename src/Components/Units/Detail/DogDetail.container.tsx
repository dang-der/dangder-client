import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import {
  exceptionModalState,
  matchedModalVisibleState,
  nonmemberModalVisible,
  passBuyModalVisibleState,
  selectedDogIdBuyPassState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateLikeArgs,
  IMutationJoinChatRoomArgs,
  IQuery,
  IQueryFetchOneDogArgs,
} from "../../../Commons/Types/Generated/types";
import LikeModal from "../../Commons/Modal/Like/LoadingModal";
import { FETCH_AROUND_DOG } from "../Main/DogMain.queries";
import MatchedModal from "../Main/MatchedModal/MatchedModal";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";

import DogDetailUI from "./DogDetail.presenter";
import {
  CREATE_LIKE,
  FETCH_LOGIN_USER_IS_CERT,
  // FETCH_DOG_DISTANCE,
  FETCH_ONE_DOG,
  JOIN_CHAT_ROOM,
} from "./DogDetail.queries";
import NonmemberModal from "./NonmemberModal/NonmemberModal";

export default function DogDetail() {
  const router = useRouter();

  const [likeModalVisible, setLikeModalVisible] = useState(false);

  const [matchVisible, setVisibleMatch] = useRecoilState(
    matchedModalVisibleState
  );
  const [passVisible, setVisibleBuyPass] = useRecoilState(
    passBuyModalVisibleState
  );

  const [nonMemberVisble, setVisbleNonMember] = useRecoilState(
    nonmemberModalVisible
  );
  const [userInfo] = useRecoilState(userInfoState);
  const [, setExceptionModalVisible] = useRecoilState(exceptionModalState);
  const [, setSelectedDogId] = useRecoilState(selectedDogIdBuyPassState);

  const { data: userIsCert } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );
  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

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

  useEffect(() => {
    console.log("nonMemberVisible", nonMemberVisble);
  }, [nonMemberVisble]);

  const handleJoinChatRoom = async () => {
    if (!userIsCert?.fetchLoginUserIsCert) {
      setVisibleBuyPass(true);
      setSelectedDogId(String(router.query.dogId) || "");
      return;
    }

    try {
      const { data: joinChatRoomData } = await joinChatRoom({
        variables: {
          dogId: String(userInfo?.dog?.id),
          chatPairId: String(router.query.dogId),
        },
      });

      if (!joinChatRoomData?.joinChatRoom.id) {
        throw Error("채팅방 입장 실패");
      }

      router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
    } catch (e) {
      console.log("handleJoinChatRoomError", e);
      if (e instanceof Error) {
        setExceptionModalVisible({ visible: true, message: e.message });
      }
    }
  };

  const onClickLike = () => {
    setLikeModalVisible(true);
  };

  const handleCompleteAnimation = async () => {
    try {
      const { data: matchUserData } = await createLike({
        variables: {
          createLikeInput: {
            sendId: String(userInfo?.dog?.id),
            receiveId: String(router.query.dogId),
          },
        },
        refetchQueries: [
          {
            query: FETCH_AROUND_DOG,
            variables: { id: userInfo?.dog?.id, page: 1 },
          },
        ],
      });

      setLikeModalVisible(false);

      if (!matchUserData?.createLike.isMatch) {
        router.back();
        return;
      }

      setVisibleMatch(true);
    } catch (e) {
      console.log("handleClickLikeError", e);
      setLikeModalVisible(false);
      if (e instanceof Error) {
        setExceptionModalVisible({ visible: true, message: e.message });
      }
    }
  };

  return (
    <>
      {nonMemberVisble && <NonmemberModal />}

      {likeModalVisible && (
        <LikeModal handleCompleteAnimation={handleCompleteAnimation} />
      )}

      {matchVisible && <MatchedModal receiveId={String(router.query.dogId)} />}
      {passVisible && <BuyPassTicketModal />}
      <DogDetailUI
        handleClickLike={onClickLike}
        handleJoinChatRoom={handleJoinChatRoom}
        pickDogData={pickDogData}
      />
    </>
  );
}
