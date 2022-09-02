import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReportInfo = styled.div`
  width: 25.875rem;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

export const ReportInfoTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReportIcon = styled.div`
    width: 3rem;
    height: 3rem;
    border-bottom: 2.4rem solid red;
    border-top: 1.6rem solid transparent;
    border-left: 1.6rem solid transparent;
    border-right: 1.6rem solid transparent;
    margin-top: 15.5rem;
`;

export const ReportTitle = styled.div`
  font-size: 1rem;
  font-weight: 275;
  color: #000000;
  margin-top: 1rem;
`;

export const ReportInfoMid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const ReportContentClosedIcon = styled.div`
    width: 1rem;
    height: 1rem;
    border: 0.5rem solid red;
    border-radius: 50%;
    margin-top: 6.7rem;
    margin-left: 1.7rem;
`;

export const ReportContentClosed = styled.div`
  width: 21rem;
  font-size: 1rem;
  font-weight: 275;
  color: #000000;
  margin-top: 6.37rem;
  margin-left: 1rem;
`;

export const ReportContentRescueIcon = styled.div`
    width: 1rem;
    height: 1rem;
    border: 0.5rem solid red;
    border-radius: 50%;
    margin-top: 3rem;
    margin-left: 1.7rem;
`;

export const ReportContentRescue = styled.div`
  width: 21rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 1rem;
  font-weight: 275;
  color: #000000;
  margin-top: 2.68rem;
  margin-left: 1rem;
`;

export const NextButton = styled.button`
  font-size: 1.5rem;
  font-weight: 800;
  width: 22.56rem;
  height: 3.75rem;
  color: #ffffff;
  cursor: pointer;
  border: 0.06rem solid #304ffe;
  border-radius: 3.125rem;
  background-color: #304ffe;
  margin-top: 12.5rem;
`;
