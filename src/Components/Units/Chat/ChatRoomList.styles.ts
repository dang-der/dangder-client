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
  color: white;
  width: 5rem;
  height: 100%;
  font-size: 0.7rem;
  background-color: ${(props: SwipeMenuStyleProps) =>
    props.backgroundColor || "white"};
`;

export const SwipeContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
