import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const TimerText = styled.span`
  align-self: flex-end;
  justify-self: flex-end;
  width: 6rem;
  text-align: end;
  margin-right: 1.3rem;
  margin-top: 1rem;
`;

export const ButtonWrapper = styled.div`
  width: 85%;
  position: absolute;
  bottom: 2rem;
  z-index: 2;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 576px) {
    width: 576px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

