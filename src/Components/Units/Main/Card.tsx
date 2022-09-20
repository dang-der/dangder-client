import * as S from "./DogMainPage.styles";
import React, { useRef, useEffect, useState } from "react";
import { useMotionValue, useAnimation } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";
import { FETCH_LOGIN_USER_IS_CERT, JOIN_CHAT_ROOM } from "./DogMain.queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationJoinChatRoomArgs,
  IQuery,
} from "../../../Commons/Types/Generated/types";
import { useRecoilState } from "recoil";
import { passBuyModalVisibleState } from "../../../Commons/Store/Modal/ModalVisibleState";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";

interface CardProps {
  drag: boolean;
  onVote: (result: boolean, direction: string | undefined) => void;
  data: any;
}

export const Card = ({ onVote, data, drag }: CardProps) => {
  const [userInfo] = useRecoilState(userInfoState);
  const [visible, setVisible] = useRecoilState(passBuyModalVisibleState);

  const router = useRouter();
  const cardElem = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState<string | undefined>();
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const [velocity, setVelocity] = useState<number>(0);

  const getVote = (childNode: Element, parentNode: Element | null) => {
    if (!parentNode) {
      console.log("Card-getVote : parendElement is null");
      return;
    }

    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    const result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;
    return result;
  };

  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
  };

  useEffect(() => {
    if (!direction) return;

    setLastDirection(direction);
  }, [direction]);

  const getTrajectory = () => {
    setVelocity(x.getVelocity());
    setDirection(getDirection());
  };

  const flyAway = (min: number) => {
    const flyAwayDistance = (direction: string) => {
      if (!cardElem.current) return;

      const parentWidth =
        cardElem.current.parentElement?.getBoundingClientRect().width || 0;

      const childWidth = cardElem.current?.getBoundingClientRect().width || 0;

      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      if (cardElem.current) {
        const childNode = cardElem.current;
        const parentNode = cardElem.current.parentElement;
        const result = getVote(childNode, parentNode);
        result !== undefined && onVote(result, lastDirection);
      }
    });

    return () => unsubscribeX();
  });

  const onClickItem = () => {
    if (!data[0].id) return;
    router.push(`/${String(data[0].id)}`);
  };

  const { data: loginUserIsCert } = useQuery<
    Pick<IQuery, "fetchLoginUserIsCert">
  >(FETCH_LOGIN_USER_IS_CERT);

  const [joinChatRoom] = useMutation<
    Pick<IMutation, "joinChatRoom">,
    IMutationJoinChatRoomArgs
  >(JOIN_CHAT_ROOM);

  const onClickPassTicket = async () => {
    if (!loginUserIsCert?.fetchLoginUserIsCert) {
      setVisible(true);
    } else {
      try {
        const { data: joinChatRoomData } = await joinChatRoom({
          variables: {
            dogId: String(router.query.dogId),
            chatPairId: String(router.query.dogId),
          },
        });

        if (!joinChatRoomData?.joinChatRoom.id) {
          throw Error("채팅방 입장 실패");
          return;
        }

        router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
        setVisible(false);
      } catch (e) {
        console.log("handleJoinChatRoomError", e);
      }
    }
  };

  return (
    <>
      <BuyPassTicketModal />
      {userInfo !== undefined ? (
        <S.StyledCard
          animate={controls}
          dragConstraints={
            constrained && { left: 0, right: 0, top: 0, bottom: 0 }
          }
          dragElastic={1}
          ref={cardElem}
          style={{ x }}
          onDrag={getTrajectory}
          onDragEnd={() => flyAway(500)}
          whileTap={{ scale: 1.1 }}
          drag={drag}
        >
          <S.Item
            style={{
              backgroundImage: `url(${
                "https://storage.googleapis.com/" + data[0].img?.[0].img || ""
              })`,
              backgroundSize: "cover",
            }}
            onClick={onClickItem}
          >
            <S.DogInfoWrapper>
              <S.DogHeaderWrapper>
                <S.DogHeader>{data[0]?.name}, &nbsp;</S.DogHeader>
                <S.DogHeader> {data[0]?.age}</S.DogHeader>
                <S.DogHeader>
                  {data[0]?.gender === "암컷" ? (
                    <S.DogFemaleIcon />
                  ) : (
                    <S.DogMaleIcon />
                  )}
                </S.DogHeader>
              </S.DogHeaderWrapper>
              <S.DogDistance>
                <LocationOnIcon />
                {data[1]?.distance}km
              </S.DogDistance>
              <S.DogDescription>{data[0]?.description}</S.DogDescription>
            </S.DogInfoWrapper>
          </S.Item>
        </S.StyledCard>
      ) : (
        <S.StyledCard
          animate={controls}
          dragConstraints={
            constrained && { left: 0, right: 0, top: 0, bottom: 0 }
          }
          dragElastic={1}
          ref={cardElem}
          style={{ x }}
          onDrag={getTrajectory}
          onDragEnd={() => flyAway(500)}
          whileTap={{ scale: 1.1 }}
          drag={drag}
        >
          <S.Item
            style={{
              backgroundImage: `url(${
                "https://storage.googleapis.com/" + data[0].img?.[0].img || ""
              })`,
              backgroundSize: "cover",
            }}
            onClick={onClickItem}
          >
            <S.DogInfoWrapper>
              <S.DogHeaderWrapper>
                <S.DogHeader>{data[0]?.name}, &nbsp;</S.DogHeader>
                <S.DogHeader> {data[0]?.age}</S.DogHeader>
                <S.DogHeader>
                  {data[0]?.gender === "암컷" ? (
                    <S.DogFemaleIcon />
                  ) : (
                    <S.DogMaleIcon />
                  )}
                </S.DogHeader>
              </S.DogHeaderWrapper>
              <S.DogDescription>{data[0]?.description}</S.DogDescription>
            </S.DogInfoWrapper>
          </S.Item>
        </S.StyledCard>
      )}
      <S.DogPassWrapper onClick={onClickPassTicket}>
        <S.DogPassIcon src="/passIcon.png" />
      </S.DogPassWrapper>
    </>
  );
};
