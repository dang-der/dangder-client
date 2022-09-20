import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GuidanceWrapper = styled.h1`
  font-weight: 700;
  font-size: 2.1rem;
  margin-bottom: 4rem;
`;

export const AuthCodeBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const AuthCodeBox = styled.input`
  background-color: #f5f5f5;
  border-radius: 0.9rem;
  height: 7rem;
  width: 5.5rem;
  border: none;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ErrorTextWrapper = styled.span`
  font-size: 0.875rem;
  color: red;
  margin-top: 5px;
`;

export const ErrorText = styled.span`
  font-size: 0.875rem;
  color: red;
  margin-top: 5px;
`;

export const SubTitleWrapper = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin-right: 5px;
`;

export const MiniGuidanceText = styled.span`
  font-weight: 400;
  font-size: 0.75rem;
  color: #c0cfd8;
  margin: 2px 2px;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const IntroduceTextField = styled.textarea`
  width: 100%;
  height: 8.125rem;
  border: 1px solid #000000;
  border-radius: 26px;
  margin-top: 1.5rem;
  padding: 1.25rem;
  font-size: 0.875rem;
`;