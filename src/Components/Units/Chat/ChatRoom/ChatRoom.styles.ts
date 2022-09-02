import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ChatHeader = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
`;

export const BackArrow = styled.div`
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OtherDogContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transform: translateX(-50%);
`;

export const OtherDogImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: rebeccapurple;
  margin-bottom: 0.5rem;
`;

export const OtherDogName = styled.span`
  font-size: 0.8rem;
  color: #7d7b7b;
`;

export const ChatMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 1.5rem;
  height: 82%;
  overflow-y: scroll;
`;

export const ChatInputWrapper = styled.form`
  position: absolute;
  bottom: 1rem;
  width: 95%;
  height: 3rem;
  border-radius: 2rem;

  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;
  justify-content: space-between;
  background-color: #f0efef;
`;

export const MessageInput = styled.input`
  height: 2.5rem;
  padding: 0.1rem;
  border: none;
  width: 90%;
  background-color: transparent;
`;

export const SendButton = styled.button`
  height: 80%;
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 0.9rem;
`;
