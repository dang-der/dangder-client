import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Lottie from "lottie-react";

import {
  exceptionModalState,
  matchedModalVisibleState,
} from "../../../../Commons/Store/Modal/ModalVisibleState";
import BlueButton from "../../../Commons/Button/BlueButton";
import { DimWrapper } from "../../../Commons/Modal/CustomLayoutModal/CustomLayoutModal";
import * as S from "./MatchedModal.styles";
import ani_matched from "../../../../../public/ani_matched.json";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_ONE_DOG } from "../../Chat/Chat.queries";
import {
  IMutation,
  IMutationJoinChatRoomArgs,
  IQuery,
  IQueryFetchOneDogArgs,
} from "../../../../Commons/Types/Generated/types";

import { useRouter } from "next/router";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { JOIN_CHAT_ROOM } from "../../Detail/DogDetail.queries";
import { enteredChatRoomInfoState } from "../../../../Commons/Store/Chat/Chat";

interface MatchedModalProps {
  receiveId: string;
}

export default function MatchedModal({ receiveId }: MatchedModalProps) {
  console.log("MatchedModal - received", receiveId);
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);
  const [visible, setVisible] = useRecoilState(matchedModalVisibleState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const { data: pairDogData } = useQuery<
    Pick<IQuery, "fetchOneDog">,
    IQueryFetchOneDogArgs
  >(FETCH_ONE_DOG, { variables: { id: receiveId } });

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  console.log("MatchedModal", pairDogData);

  const toggleModal = (visible: boolean | MouseEvent<HTMLElement>) => {
    if (typeof visible === "boolean") {
      setVisible(visible);
      return;
    }
    if (!visible) setVisible((p) => !p);
  };

  const onClickChat = async () => {
    console.log("onClickChat");
    try {
      const { data } = await joinChatRoom({
        variables: {
          dogId: userInfo?.dog?.id || "",
          chatPairId: receiveId,
        },
      });

      setVisible(false);

      if (!data?.joinChatRoom.id) throw Error("채팅방 입장에 실패했습니다.");

      const roomId = data.joinChatRoom.id;
      router.push(`/chat/${roomId}`);
    } catch (e) {
      console.log("joinChatRoomError", e);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }
    }
  };

  return (
    <>
      <DimWrapper>
        <S.CloseIconWrapper onClick={() => setVisible(false)}>
          <CloseRoundedIcon />
        </S.CloseIconWrapper>
        <S.Wrapper>
          <S.DogImageWrapper>
            <Lottie animationData={ani_matched} loop={true} />
            <S.DogImage
              src={
                "https://storage.googleapis.com/" +
                pairDogData?.fetchOneDog.img[0].img
              }
            />
          </S.DogImageWrapper>

          <span>
            매칭 성공!
            <br />
            {pairDogData?.fetchOneDog.name}님과 대화해보세요!
          </span>

          <BlueButton
            title="채팅하기"
            onClick={onClickChat}
            style={{ width: "12.5rem", marginTop: "5rem", fontSize: "1rem" }}
          />
        </S.Wrapper>
      </DimWrapper>
    </>
  );
}
