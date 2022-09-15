import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  margin-top: 1.5rem;
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-bottom: -15rem; */
`;

export const ListImageWrapper = styled.div`
  width: 100%;
  height: auto;
  /* width: 15rem;
  height: 22rem; */
  border-radius: 1.25rem;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-bottom: -15rem; */
`;

export const GradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 14rem;
  height: 20rem;
  /* display: flex;
  flex-direction: row; */
  /* margin-top: -63rem; */
  /* border: 1px solid #ffffff; */
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.05) 70%,
      rgba(0, 0, 0, 0.7) 85%,
      #000000 116.48%
    ),
    url("/dog5.jpeg");
`;

// export const ListImage = styled.img`
//   width: 15rem;
//   height: 22rem;
//   /* width: 100%;
//   height: 100%; */
//   border-radius: 1.25rem;
// `;

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
  width: 100%;
  height: 100%;
  margin-left: 6rem;
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
