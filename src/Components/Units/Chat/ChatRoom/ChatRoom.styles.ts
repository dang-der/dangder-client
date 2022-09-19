import styled from "@emotion/styled";
import { Gray76 } from "../../../../../styles/GlobalStyles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: aliceblue; */
`;

export const ChatHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
  flex: 0.1 1 0;
`;

export const OtherDogContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const OtherDogImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  object-fit: cover;
`;

export const OtherDogName = styled.span`
  font-size: 0.8rem;
  color: #7d7b7b;
`;

export const ChatMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4 1 0;
  width: 100%;
  padding: 0.5rem 1.5rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`;

export const MessageInputWrapper = styled.form`
  width: calc(576px - 3rem);
  height: 3rem;
  border-radius: 2rem;

  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;
  justify-content: space-between;
  background-color: #f0efef;

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const IconWrapper = styled.button`
  color: #304ffe;
  flex-grow: 0.1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
`;

export const MessageInput = styled.input`
  height: 2.5rem;
  padding: 0.1rem;
  border: none;
  flex-grow: 1;
  background-color: transparent;
`;

export const SendButton = styled.button`
  height: 80%;
  flex-grow: 0.3;
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 0.9rem;
`;
interface ChatInputWrapperStyleProps {
  isOpen: boolean;
}
export const ChatInputWrapper = styled.div`
  width: 100%;
  /* background-color: re; */
  padding: 0.8rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: all ease 0.1s;
  flex: ${(props: ChatInputWrapperStyleProps) => (props.isOpen ? "1.2" : "0.1")}
    1 0;
`;

export const BottomMenuContainerWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.3rem;
  svg {
    color: white;
  }
  span {
    margin-top: 0.5rem;
    color: #767676;
  }
`;

export const MenuCircle = styled.div`
  background-color: #fdc500;
  width: 2.938rem;
  height: 2.938rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EnterMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 1.5rem 0;
  color: ${Gray76};
`;

interface OpenMenuIconWrapperStyleProps {
  isOpen: boolean;
}

export const OpenMenuIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transform: ${(props: OpenMenuIconWrapperStyleProps) =>
      props.isOpen ? "rotate(45deg)" : "rotate(0deg)"};
    transition: all ease 0.4s;
  }
`;