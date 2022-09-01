import styled from "@emotion/styled";

interface ISubmitButtonProps {
  isActive: boolean;
}

export const Wrapper = styled.div`
  width: 25.875rem;
  height: auto;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReportInfo = styled.div`
  width: 25.875rem;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
`;

export const ReportInfoTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReportIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-bottom: 1.4rem solid red;
  border-top: 0.8rem solid transparent;
  border-left: 0.8rem solid transparent;
  border-right: 0.8rem solid transparent;
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
`;

export const ReportContentInput = styled.textarea`
  width: 24.125rem;
  height: 20rem;
  font-size: 1rem;
  font-weight: 200;
  color: #929292;
  margin-top: 2.19rem;
  margin-left: 1rem;
  border: none;
  border-radius: 0.65rem;
  min-width: 6.75rem;
  line-height: 1.5rem;
  padding-left: 0.8rem;
  padding-top: 0.5rem;
  background-color: lightgray;
`;

export const ReportContentSecret = styled.div`
  width: 21rem;
  font-size: 1rem;
  font-weight: 275;
  color: #000000;
  margin-top: 6rem;
  margin-left: 3rem;
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
  margin-top: 2rem;
  background-color: ${(props: ISubmitButtonProps) =>
    props.isActive ? "#304ffe" : "#d9d9d9"};
`;
 