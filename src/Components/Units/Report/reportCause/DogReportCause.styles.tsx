import styled from "@emotion/styled";

interface ISubmitButtonProps {
  isActive: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;

  padding: 3rem;
`;

export const ReportInfoTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReportIcon = styled.div`
  svg {
    width: 3rem;
    height: 3rem;
    color: red;
  }
`;

export const ReportTitle = styled.div`
  font-size: 1rem;
  color: #000000;
  margin-top: 1rem;
`;

export const ReportInfoMid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const ReportContentInput = styled.textarea`
  width: 100%;
  height: 15rem;
  font-size: 1rem;
  margin-top: 2.19rem;
  border: 0.5px solid lightgray;
  border-radius: 0.65rem;
  padding: 1rem;
`;

export const ReportContentSecret = styled.div`
  font-size: 0.8rem;
  font-weight: 275;
  color: #000000;
  margin-top: 1.875rem;
`;

export const NextButton = styled.button`
  font-size: 1.5rem;
  font-weight: 800;
  width: 22.56rem;
  height: 3.75rem;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 3.125rem;
  margin-top: 1.5rem;
  background-color: #304ffe;
`;
 