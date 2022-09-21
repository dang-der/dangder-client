import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-bottom: 0.5px solid gray;
`;

export const DogImage = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background-color: gray;
  margin-right: 1.5rem;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-evenly;
`;

export const AnotherDogName = styled.span`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Message = styled.span`
  font-size: 0.8rem;
  color: #7d7b7b;
`;
