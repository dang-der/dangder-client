import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 0.5rem;
`;

export const ReviewerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  margin-right: 1rem;
  img {
    width: 4.5rem;
    height: 4.5rem;
    background-color: gray;
    border-radius: 50%;
  }

  span {
    flex-grow: 3;
    font-size: 0.8rem;
    font-weight: 700;
    margin-top: 0.5rem;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 4;
`;

export const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export const Tag = styled.span`
  padding: 0.438rem;
  border: 1px solid #767676;
  border-color: #304ffe;
  border-radius: 6.25rem;
  margin-right: 0.813rem;
  margin-bottom: 0.813rem;
  background-color: white;
`;

export const MessageWrapper = styled.span`
  width: 100%;
  white-space: normal;
  word-break: break-all;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: gray;
  margin-bottom: 0.5rem;
`;
