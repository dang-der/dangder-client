import React, { useState } from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

interface StackProps {
  onVote: (data: any, vote: boolean, direction: string | undefined) => void;
  datas: any;
}

export default function DogMainUI({ onVote, datas }: StackProps) {
  const [stack, setStack] = useState(datas);

  const pop = (array: any[] | undefined) => {
    if (!array) return;

    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (
    item: any,
    vote: boolean,
    direction: string | undefined
  ) => {
    const newStack = pop(stack);
    // stack.pop();
    setStack(newStack);

    onVote(item, vote, direction);
  };

  return (
    <>
      <Frame>
        {(stack || []).map((item: any, index: any) => {
          const isTop = index === (stack?.length || 0) - 1;
          return (
            <Card
              drag={isTop}
              key={item.id || index}
              onVote={(result, direction) =>
                handleVote(item, result, direction)
              }
              data={item}
            />
          );
        })}
      </Frame>
    </>
  );
}
