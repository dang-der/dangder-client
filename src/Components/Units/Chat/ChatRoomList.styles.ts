import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h2`
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ChatListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface SwipeMenuStyleProps {
  backgroundColor: string;
}
export const SwipeMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  width: 5rem;
  padding: 1rem;
  font-size: 0.7rem;
  background-color: ${(props: SwipeMenuStyleProps) =>
    props.backgroundColor || "white"};
`;
