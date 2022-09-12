import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
`;

export const DetailImageWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  margin-top: 1rem;
`;

export const DetailImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
`;

export const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  background-color: aliceblue;
  border-radius: 1.25rem;
`;

export const DetailMoveBackWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2.5rem;
`;

export const DetailContentMoveBack = styled.img`
  margin-left: 24rem;
  width: 3.43rem;
  height: 3.43rem;

  /* z-index: 2; */
  /* border: 1.8rem solid #304ffe;
    border-radius: 50%; */
  cursor: pointer;
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3.8rem 3.8rem 0rem 0rem;
  background-color: #ffffff;
  width: 100%;
`;

export const DetailMaineTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DetailInfor = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2.43rem;
  margin-top: 3.6975rem;
`;

export const DetailName = styled.div`
  font-size: 1.9rem;
  font-weight: 700;
  color: #000000;
  /* margin-top: 0.2rem; */
`;

export const DetailAge = styled.div`
  font-size: 1.9rem;
  font-weight: 700;
  color: #000000;
  margin-left: 1rem;
  /* margin-top: 0.2rem; */
`;

export const DistanceWrapper = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-top: 1rem;
`;

export const DetailKm = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  width: 3.5rem;
  height: 2rem;
  /* border: 0.06rem solid #000000;
    border-radius: 1.25rem; */
  margin-left: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// export const DetailReport = styled.div`
//     /* margin-left: 8.7rem;
//     margin-top: 2.5rem; */
// `

// export const DetailMoveReport = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     /* margin-right: 2.5rem; */
//     margin-left: 8.7rem;
//     margin-top: 2.5rem;
//     width: 1.38rem;
//     height: 1.38rem;
//     /* border: 0.8rem solid #fd1414; */
//     /* border-radius: 50%; */
//     border-bottom: 1.4rem solid red;
//     border-top: 0.8rem solid transparent;
//     border-left: 0.8rem solid transparent;
//     border-right: 0.8rem solid transparent;
//     cursor: pointer;
// `

export const DetailSubTitle = styled.div`
  margin-top: 1rem;
  margin-left: 2.43rem;
`;

export const DetailIntroduce = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
`;

export const DetailSubMaineTitle = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 3rem; */
  margin-left: 1.43rem;
`;

export const DetailCharacterTitle = styled.div`
  font-size: 0.94rem;
  font-weight: 700;
  color: #000000;
  margin-left: 1rem;
`;

export const DetailCharacterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* margin-top: 1rem; */
`;

export const DetailCharacter = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #ffffff;
  width: 5.9rem;
  height: 2.06rem;
  /* border: 0.06rem solid #d9d9d9;
    background-color: #d9d9d9;
    border-radius: 6.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

export const DetailFunctionIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* margin-top: 1rem; */
`;

export const DetailFunctionMoveBack = styled.img`
  width: 6rem;
  height: 6rem;
  /* border: 0.5rem solid red;
    border-radius: 50%; */
  /* margin-right: 1rem; */
  cursor: pointer;
`;

export const DetailFunctionMoveChat = styled.img`
  width: 6rem;
  height: 6rem;
  /* border: 0.5rem solid #b411ff;
    border-radius: 50%; */
  /* margin-right: 1rem; */
  cursor: pointer;
`;

export const DetailFunctionLike = styled.img`
  width: 6rem;
  height: 6rem;
  /* border: 0.5rem solid #73f428;
    border-radius: 50%; */
  cursor: pointer;
`;
