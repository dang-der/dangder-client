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
  background-color: ${(props) => (props.isMine ? "#304FFE99" : "#bababa")};
  display: flex;
  color: white;
  line-height: 1.1rem;
  align-items: center;
  padding: 1rem;
  font-size: 0.8rem;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  border-bottom-left-radius: ${(props: MessageItemStyleProps) =>
    props.isMine ? "0.8rem" : "0rem"};

  border-bottom-right-radius: ${(props: MessageItemStyleProps) =>
    props.isMine ? "0rem" : "0.8rem"};
`;
