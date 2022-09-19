import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import { IDog } from "../../../Commons/Types/Generated/types";

const StyledCard = styled(motion.div)`
  position: absolute;
`;

const Item = styled.div`
  background: #f9fafb;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-shadow: 0 10px 10px #d1d5db;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  transform: ${() => {
    const rotation = Math.random() * (5 - -5) + -5;
    return `rotate(${rotation}deg)`;
  }};
`;

interface CardProps {
  drag: boolean;
  onVote: (result: boolean, direction: string | undefined) => void;
  data: IDog;
}

export const Card = ({ onVote, data, drag }: CardProps) => {
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

  // determine direction of swipe based on velocity
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

  return (
    <StyledCard
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
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
            "https://storage.googleapis.com/" + data.img?.[0].img || ""
          })`,
          backgroundSize: "cover",
        }}
      >
        <p>{data.id}</p>
        <p>{data.name}</p>
      </Item>
    </StyledCard>
  );
};
