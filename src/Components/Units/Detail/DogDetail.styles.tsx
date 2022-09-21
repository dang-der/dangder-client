import styled from "@emotion/styled";
import Slider from "react-slick";
import { MainColor } from "../../../../styles/GlobalStyles";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  margin-top: 1em;
`;

export const DetailImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  /* margin-bottom: -15rem; */
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  /* margin-bottom: -15rem; */
`;

export const DetailImage = styled.img`
  width: 100%;
  height: 33rem;
  object-fit: cover;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
`;

export const DetailWrapper = styled.div`
  /* margin-top: 1rem; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* flex-grow: 1; */
  /* background-color: aliceblue; */
  border-radius: 1.25rem 1.25rem 0rem 0rem;
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  /* border-radius: 3.8rem 3.8rem 0rem 0rem; */
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  /* z-index: 100; */
  /* position: relative;
  bottom: 10rem; */
`;

export const DetailMoveBackWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 4.5rem;
`;

// export const DetailContentMoveBack = styled.img`
//   /* margin-left: 24rem; */
//   width: 3.43rem;
//   height: 3.43rem;

//   /* z-index: 2; */
//   /* border: 1.8rem solid #304ffe;
//     border-radius: 50%; */
//   cursor: pointer;
// `;

export const DetailMaineTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2.43rem;
  margin-top: 2.43rem;
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  /* margin-left: 2.43rem;
  margin-top: 3.6975rem; */
`;

export const DetailName = styled.div`
  font-size: 1.9rem;
  font-weight: 700;
  color: #000000;
  margin-top: 0.2rem;
`;

export const DetailAge = styled.div`
  font-size: 1.9rem;
  font-weight: 700;
  color: #000000;
  margin-left: 1rem;
  margin-top: 0.2rem;
`;

export const DetailGender = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  /* margin-left: 1rem; */
  /* margin-top: 0.8rem; */
`;

export const DogFemaleIcon = styled(FemaleIcon)`
  font-size: 1.6rem;
  color: red;
`;

export const DogMaleIcon = styled(MaleIcon)`
  font-size: 1.6rem;
  color: ${MainColor};
`;

export const DetailIsNeut = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin-left: 0.3rem;
  margin-bottom: 0.3rem;
  /* margin-top: 0.8rem; */
`;

export const DistanceWrapper = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-top: 1rem;
`;

// export const DetailKm = styled.div`
//   font-size: 1rem;
//   font-weight: 500;
//   color: #000000;
//   width: 3.5rem;
//   height: 2rem;
//   /* border: 0.06rem solid #000000;
//     border-radius: 1.25rem; */
//   margin-left: 1.25rem;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// `;

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
  margin-top: 1rem;
  margin-left: 1.43rem;
  padding-bottom: 1rem;
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
  margin-top: 1rem;
`;

export const DetailCharacter = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${MainColor};
  /* color: #ffffff; */
  width: 100%;
  height: 100%;
  /* border: 0.06rem solid ${MainColor};
  border-radius: 6.25rem; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  flex-grow: 0.1;
  /* margin-left: 1rem; */
`;

export const Tags = styled.div`
  padding: 0.438rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${MainColor};
  /* color: #ffffff; */
  width: auto;
  height: 2rem;
  border: 0.06rem solid ${MainColor};
  border-radius: 6.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

export const DetailFunctionIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const DetailFunctionMoveBack = styled.img`
  width: 6rem;
  height: 6rem;
  /* border: 0.5rem solid red;
    border-radius: 50%; */
  margin-right: 1rem;
  cursor: pointer;
`;

export const DetailFunctionMoveChat = styled.img`
  width: 6rem;
  height: 6rem;
  /* border: 0.5rem solid #b411ff;
    border-radius: 50%; */
  margin-right: 1rem;
  cursor: pointer;
`;

export const DetailFunctionLike = styled.img`
  width: 6rem;
  height: 6rem;
  /* border: 0.5rem solid #73f428;
    border-radius: 50%; */
  cursor: pointer;
`;

export const ReactSlick = styled(Slider)`
  /* width: 100%;
  height: 100%; */
  .slick-dots {
    display: flex;
    justify-content: center;
    height: auto;
  }
  /* margin-bottom: 15px; */
  /* padding: 20px 0; */
  /* list-style-type: none; */
`;
