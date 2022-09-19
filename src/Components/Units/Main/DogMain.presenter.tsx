import React, { useState } from "react";
import styled from "@emotion/styled";
import { Card } from "./Card";
import { IDog } from "../../../Commons/Types/Generated/types";

// basic default styles for container
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
  datas: IDog[] | undefined;
}

export default function DogMainUI({ onVote, datas }: StackProps) {
  console.log("Stack", datas);
  const [stack, setStack] = useState(datas);

  // return new array with last item removed
  const pop = (array: any[] | undefined) => {
    if (!array) return;

    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (
    item: IDog,
    vote: boolean,
    direction: string | undefined
  ) => {
    // update the stack
    const newStack = pop(stack);
    setStack(newStack);

    onVote(item, vote, direction);
  };

  return (
    <>
      <Frame>
        {(stack || []).map((item, index) => {
          console.log("items", item);
          const isTop = index === (stack?.length || 0) - 1;
          return (
            <Card
              drag={isTop} // Only top card is draggable
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
