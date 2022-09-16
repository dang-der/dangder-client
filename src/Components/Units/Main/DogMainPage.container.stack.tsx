import { useState, Children } from "react";
import styled from "@emotion/styled";
import { Card } from "./DogMainPage.container.card";

export const Stack = ({ onVote, children }) => {
  const [stack, setStack] = useState(Children.toArray(children));
  // const [stack, setStack] = useState([children]);

  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item, vote) => {
    const newStack = pop(stack);
    setStack(newStack);

    onVote(item, vote);
  };

  return (
    <>
      <Frame>
        {stack.map((item, index) => {
          console.log(stack);
          const isTop = index === stack.length - 1;
          return (
            <Card
              drag={isTop}
              key={item.key || index}
              onVote={(result) => handleVote(item, result)}
            >
              {item}
            </Card>
          );
        })}
      </Frame>
    </>
  );
};

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
