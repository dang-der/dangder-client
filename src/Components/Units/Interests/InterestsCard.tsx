import * as S from "../TodayDog/TodayDogList.styles";
import React, { useRef, useEffect, useState } from "react";
import { useMotionValue, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { IDog } from "../../../Commons/Types/Generated/types";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";

interface CardProps {
  drag: boolean;
  data: IDog | undefined;
  onVote: (result: boolean, direction: string | undefined) => void;
  handleClickPassTicket: (pairId: string) => Promise<void>;
}

export const InterestsCard = ({
  onVote,
  data,
  drag,
  handleClickPassTicket,
}: CardProps) => {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);
  const cardElem = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState<string | undefined>();
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const [velocity, setVelocity] = useState<number>(0);

  useEffect(() => {
    if (!direction) return;

    setLastDirection(direction);
  }, [direction]);

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

  const onClickItem = () => {
    if (!data?.id) return;
    router.push(`/${String(data.id)}`);
  };

  const onClickPassTicket = () => {
    handleClickPassTicket(data?.id || "");
  };

  return (
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
              data?.img?.[0].img
                ? `https://storage.googleapis.com/${data?.img[0].img}`
                : "/pug.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <S.DogInfoWrapper onClick={onClickItem} style={{ height: "30%" }}>
            <S.DogHeaderWrapper>
              <S.DogHeader>{data?.name}, &nbsp;</S.DogHeader>
              <S.DogHeader> {data?.age}</S.DogHeader>
              <S.DogHeader>
                {data?.gender === "암컷" ? (
                  <S.DogFemaleIcon />
                ) : (
                  <S.DogMaleIcon />
                )}
              </S.DogHeader>
            </S.DogHeaderWrapper>
            <S.DogDescription>{data?.description}</S.DogDescription>
          </S.DogInfoWrapper>
        </S.Item>
      </S.StyledCard>
      {userInfo && (
        <S.DogPassWrapper onClick={onClickPassTicket}>
          <S.DogPassIcon src="/passIcon.png" />
        </S.DogPassWrapper>
      )}
    </>
  );
};
