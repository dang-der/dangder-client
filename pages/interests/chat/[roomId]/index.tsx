import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../src/Commons/Store/Auth/UserInfoState";
import { snackBarState } from "../../../../src/Commons/Store/Modal/SnackBarState";
import {
  IMutation,
  IMutationJoinIChatRoomArgs,
  IQuery,
  IQueryFetchIChatMessagesByIChatRoomIdArgs,
  IQueryFetchInterestChatRoomArgs,
} from "../../../../src/Commons/Types/Generated/types";
import {
  FETCH_ICHAT_MESSAGES_BY_ICHAT_ROOM_ID,
  FETCH_INTEREST_CHAT_ROOM,
  JOIN_I_CHAT_ROOM,
} from "../../../../src/Components/Units/Chat/Chat.queries";
import ChatRoomContainer from "../../../../src/Components/Units/Chat/ChatRoom/ChatRoom.container";
import { FETCH_LOGIN_USER_IS_CERT } from "../../../../src/Components/Units/Detail/DogDetail.queries";

export default function InterestGroupChatRoomPage() {
  const router = useRouter();
  const roomId = String(router.query.roomId);
  const [userInfo] = useRecoilState(userInfoState);
  const [, setSnackBar] = useRecoilState(snackBarState);

  const { data: chatRoomData } = useQuery<
    Pick<IQuery, "fetchInterestChatRoom">,
    IQueryFetchInterestChatRoomArgs
  >(FETCH_INTEREST_CHAT_ROOM, { variables: { iRoomId: roomId } });

  const { data: messagesData, refetch } = useQuery<
    Pick<IQuery, "fetchIChatMessagesByIChatRoomId">,
    IQueryFetchIChatMessagesByIChatRoomIdArgs
  >(FETCH_ICHAT_MESSAGES_BY_ICHAT_ROOM_ID, {
    variables: {
      iChatRoomId: roomId,
    },
  });

  const { data: isCertData } = useQuery<Pick<IQuery, "fetchLoginUserIsCert">>(
    FETCH_LOGIN_USER_IS_CERT
  );

  const [joinIChatRoom] = useMutation<
    Pick<IMutation, "joinIChatRoom">,
    IMutationJoinIChatRoomArgs
  >(JOIN_I_CHAT_ROOM);

  useEffect(() => {
    if (isCertData?.fetchLoginUserIsCert) return;

    joinInterestsChatRoom();
  }, [router.query]);

  const joinInterestsChatRoom = async () => {
    try {
      const { data } = await joinIChatRoom({
        variables: {
          email: userInfo?.user?.email || "",
          iChatRoomId: String(router.query.roomId),
        },
      });

      setSnackBar({
        visible: true,
        message:
          "댕더패스 미보유 사용자는 그룹 채팅이 5분으로 제한됩니다.\n 5분 이상 사용을 원하실 경우 댕더패스를 구매해주세요.",
      });
    } catch (e) {
      if (e instanceof Error) {
        setSnackBar({
          visible: true,
          type: "error",
          message: e.message,
        });
      }
      router.back();
    }
  };

  const refetchMessages = () => {
    refetch({ iChatRoomId: roomId });
  };

  return (
    <ChatRoomContainer
      isGroupChat={true}
      chatRoomData={chatRoomData?.fetchInterestChatRoom}
      messagesData={messagesData?.fetchIChatMessagesByIChatRoomId}
      refetch={refetchMessages}
    />
  );
}
