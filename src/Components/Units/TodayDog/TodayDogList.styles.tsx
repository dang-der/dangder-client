import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-top: 1rem; */
`;

export const ListWrapper = styled.div`
  width: 47%;
  height: 20rem;
  margin-top: 1rem;
  /* margin-left: 0.5rem; */
  display: flex;
  flex-direction: column;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-bottom: -15rem; */
`;

export const ListImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* width: 15rem;
  height: 22rem; */
  border-radius: 1.25rem;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-bottom: -15rem; */
`;

interface GradientBoxStyleProps {
  imageUrl: string;
}
export const GradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.05) 70%,
      rgba(0, 0, 0, 0.7) 85%,
      #000000 116.48%
    ),
    url(${(props: GradientBoxStyleProps) => props.imageUrl});
  background-position: center center;
  background-size: cover;
`;

export const ListImage = styled.span`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
`;

export const ListFunctionIconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: -20rem;
`;

export const ListFunctionMoveChat = styled.img`
  /* margin-left: 24rem; */
  width: 5rem;
  height: 5rem;

  /* z-index: 2; */
  /* border: 1.8rem solid #304ffe;
    border-radius: 50%; */
  cursor: pointer;
`;

export const ListInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  margin-left: -1rem;
  margin-top: 12rem;
`;

export const ListName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0.2rem;
`;

export const ListAge = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-left: 1rem;
  margin-top: 0.2rem;
`;
