import styled from "@emotion/styled";

interface MessageItemStyleProps {
  isMine: boolean;
}
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  justify-content: ${(props: MessageItemStyleProps) =>
    props.isMine && "flex-end"};
`;

export const Message = styled.div`
  word-wrap: normal;
  word-break: break-all;
  max-width: 70%;
  min-height: 1.6rem;
  height: auto;
  background-color: ${(props) => (props.isMine ? "#304FFE" : "#F5F5F5")};
  display: flex;
  color: ${(props) => (props.isMine ? "white" : "black")};
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  border-top-left-radius: 1.625rem;
  border-top-right-radius: 1.625rem;
  border-bottom-left-radius: ${(props: MessageItemStyleProps) =>
    props.isMine ? "1.625rem" : "0rem"}; 

  border-bottom-right-radius: ${(props: MessageItemStyleProps) =>
    props.isMine ? "0rem" : "1.625rem"};
`;
