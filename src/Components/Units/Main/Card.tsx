import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";

const StyledCard = styled(motion.div)`
  position: absolute;
`;

const Item = styled.div`
  background: #f9fafb;
  width: calc(576px - 4rem);
  max-width: 576px;
  height: calc(100vh - 17rem);
  @media screen and (max-width: 576px) {
    width: calc(100vw - 4rem);
  }
  display: flex;
  flex-direction: column;
  font-size: 20px;
  box-shadow: 0px 10px 10px 0px rgba(150, 150, 150, 0.3);
  border-radius: 8px;
  /* border: 1px solid red; */
  transform: ${() => {
    const rotation = Math.random() * (2 - -2) + -2;
    return `rotate(${rotation}deg)`;
  }};
`;

interface CardProps {
  drag: boolean;
  onVote: (result: boolean, direction: string | undefined) => void;
  data: any;
}

export const Card = ({ onVote, data, drag }: CardProps) => {
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

  return (
    <>
      <StyledCard
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
        <Item
          style={{
            backgroundImage: `url(${
              "https://storage.googleapis.com/" + data[0].img?.[0].img || ""
            })`,
            backgroundSize: "cover",
          }}
          onClick={onClickItem}
        >
          <DogInfoWrapper>
            <DogHeaderWrapper>
              <DogHeader>{data[0]?.name}, &nbsp;</DogHeader>
              <DogHeader> {data[0]?.age}</DogHeader>
            </DogHeaderWrapper>
            <DogDistance>
              <LocationOnIcon />
              {data[1]?.distance}km
            </DogDistance>
            <DogDescription>{data[0]?.description}</DogDescription>
          </DogInfoWrapper>
        </Item>
      </StyledCard>

      <DogPassWrapper>
        <DogPassIcon src="/passIcon.png" />
      </DogPassWrapper>
    </>
  );
};

const DogInfoWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.05) 66.96%,
    #000000 100%
  );
  border-radius: 8px;
`;

const DogHeaderWrapper = styled.div`
  display: flex;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
`;

const DogHeader = styled.span``;

const DogDistance = styled.span`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
`;

const DogDescription = styled.span`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 400;
`;

const DogPassWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 1.5rem;
  right: -1rem;
  padding: 0;
`;

const DogPassIcon = styled.img`
  width: 7rem;
  height: 7rem;
`;
