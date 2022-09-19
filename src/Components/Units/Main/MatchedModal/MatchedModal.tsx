import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Lottie from "lottie-react";

import { matchedModalVisibleState } from "../../../../Commons/Store/Modal/ModalVisibleState";
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
import { JOIN_CHAT_ROOM } from "../DogMain.queries";
import { useRouter } from "next/router";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";

interface MatchedModalProps {
  receiveId: string;
}

export default function MatchedModal({ receiveId }: MatchedModalProps) {
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);
  const [visible, setVisible] = useRecoilState(matchedModalVisibleState);

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

      if (!data?.joinChatRoom.id) {
        // 에러 다이얼로그 띄우기
        return;
      }

      const roomId = data.joinChatRoom.id;
      router.push(`/chat/${roomId}`);
    } catch (e) {
      console.log("joinChatRoomError", e);
    }
  };

  return (
    <>
      <DimWrapper>
        <S.CloseIconWrapper onClick={toggleModal}>
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
