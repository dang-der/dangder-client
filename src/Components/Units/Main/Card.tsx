import * as S from "./DogMainPage.styles";
import React, { useRef, useEffect, useState } from "react";
import { useMotionValue, useAnimation } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";
import { FETCH_LOGIN_USER_IS_CERT } from "./DogMain.queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationJoinChatRoomArgs,
  IQuery,
} from "../../../Commons/Types/Generated/types";
import { useRecoilState } from "recoil";
import {
  passBuyModalVisibleState,
  selectedDogIdBuyPassState,
} from "../../../Commons/Store/Modal/ModalVisibleState";
import BuyPassTicketModal from "../PassModal/BuyPassTicketModal";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import { JOIN_CHAT_ROOM } from "../Detail/DogDetail.queries";

interface CardProps {
  drag: boolean;
  onVote: (result: boolean, direction: string | undefined) => void;
  data: any;
}

export const Card = ({ onVote, data, drag }: CardProps) => {
  const [userInfo] = useRecoilState(userInfoState);
  const [visible, setVisible] = useRecoilState(passBuyModalVisibleState);
  const [, setSelectedDogId] = useRecoilState(selectedDogIdBuyPassState);

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
        transition: { duration: 0.1 },
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
    console.log("userIsCert", loginUserIsCert?.fetchLoginUserIsCert);

    if (!loginUserIsCert?.fetchLoginUserIsCert) {
      setVisible(true);
      setSelectedDogId(String(data[0].id));
    } else {
      try {
        const { data: joinChatRoomData } = await joinChatRoom({
          variables: {
            dogId: userInfo?.dog?.id || "",
            chatPairId: String(data[0].id),
          },
        });

        if (!joinChatRoomData?.joinChatRoom.id) {
          throw Error("채팅방 입장 실패");
        }
        router.push(`/chat/${joinChatRoomData.joinChatRoom.id}`);
      } catch (e) {
        console.log("handleJoinChatRoomError", e);
      }
    }
  };

  // ""https://storage.googleapis.com/" + data[0].img?.[0].img

  console.log("Image", data[0].img[0].img.replace(" ", "%20"));
  console.log("Card", data);
  return (
    <>
      {userInfo !== undefined ? (
        <>
          <S.StyledCard
            animate={controls}
            dragConstraints={
              constrained && { left: -500, right: 500, bottom: 0, top: 0 }
            }
            dragElastic={1}
            ref={cardElem}
            style={{ x }}
            onDrag={getTrajectory}
            onDragEnd={() => flyAway(100)}
            drag={drag}
          >
            <S.Item
              style={{
                backgroundImage: `url(${
                  data[0].img?.[0].img
                    ? `https://storage.googleapis.com/${data[0].img[0].img.replace(
                        " ",
                        "%20"
                      )}`
                    : "/pug.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <S.DogInfoWrapper onClick={onClickItem} style={{ height: "30%" }}>
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
          <S.DogPassWrapper onClick={onClickPassTicket}>
            <S.DogPassIcon src="/passIcon.png" />
          </S.DogPassWrapper>
        </>
      ) : (
        <S.StyledCard
          animate={controls}
          dragConstraints={
            constrained && { left: -500, right: 500, top: 0, bottom: 0 }
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
                data[0].img?.[0].img
                  ? `https://storage.googleapis.com/${data[0].img[0].img.replace(
                      " ",
                      "%20"
                    )}`
                  : "/pug.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            onClick={onClickItem}
          >
            <S.DogInfoWrapper onClick={onClickItem} style={{ height: "30%" }}>
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
    </>
  );
};
