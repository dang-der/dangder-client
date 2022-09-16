import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const SubTitleWrapper = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem;
  align-self: flex-start;
`;

export const ContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CalendarWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimePickerWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 3rem;
  div {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  justify-content: flex-end;
  padding: 2rem 0;
`;
