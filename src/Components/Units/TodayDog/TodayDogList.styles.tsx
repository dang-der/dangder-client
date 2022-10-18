import styled from "@emotion/styled";
import { motion } from "framer-motion";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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

export const InterestWrapper = styled.div`
  width: 47%;
  height: 20rem;
  margin-top: 1rem;
  /* margin-left: 0.5rem; */
  display: flex;
  flex-direction: column;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-bottom: -15rem; */
`;

export const InterestsImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 1.5rem;
  /* width: 15rem;
  height: 22rem; */
  border-radius: 1.25rem;
  /* border-radius: 1.25rem 1.25rem 0rem 0rem; */
  /* margin-bottom: -15rem; */
  cursor: pointer;
`;

export const InterestPlayGradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.05) 35%,
      rgba(0, 0, 0, 0.7) 70%,
      #000000 116.48%
    ),
    url("/play.jpeg");
  background-position: center center;
  background-size: cover;
`;

export const InterestInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* width: 100%;
  height: 20rem; */
  margin-top: -12rem;
`;

export const InterestTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  /* margin-top: 0.2rem; */
  margin-bottom: 6.1rem;
`;

export const InterestTitleOne = styled.div`
  display: flex;
  justify-content: center;
  line-height: 1.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  /* margin-top: 0.2rem; */
  margin-bottom: 3.7rem;
`;

export const InterestTitleTwo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  /* margin-top: 0.2rem; */
  margin-bottom: 5.1rem;
`;

export const InterestBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InterestSubTitle = styled.div`
  line-height: 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  margin-left: 0.9rem;
  /* margin-top: 6rem; */
`;

export const InterestName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #b3b3b3;
  margin-left: 0.9rem;
`;

export const InterestWalkGradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.05) 35%,
      rgba(0, 0, 0, 0.7) 70%,
      #000000 116.48%
    ),
    url("/walk.png");
  background-position: center center;
  background-size: cover;
`;

export const InterestCafeGradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.05) 35%,
      rgba(0, 0, 0, 0.7) 70%,
      #000000 116.48%
    ),
    url("/cafe.png");
  background-position: center center;
  background-size: cover;
`;

export const InterestEatGradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.05) 35%,
      rgba(0, 0, 0, 0.7) 70%,
      #000000 116.48%
    ),
    url("/eat.jpeg");
  background-position: center center;
  background-size: cover;
`;

export const InterestBouncyGradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.05) 35%,
      rgba(0, 0, 0, 0.7) 70%,
      #000000 116.48%
    ),
    url("/bouncy.jpeg");
  background-position: center center;
  background-size: cover;
`;

export const InterestTimidGradientBox = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;
  border-radius: 1.25rem;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0.05) 35%,
      rgba(0, 0, 0, 0.7) 70%,
      #000000 116.48%
    ),
    url("/timid.jpeg");
  background-position: center center;
  background-size: cover;
`;

export const StyledCard = styled(motion.div)`
  position: absolute;
`;

export const Item = styled.div`
  background: #f9fafb;
  width: calc(576px - 4rem);
  max-width: 576px;
  height: calc(100vh - 17rem);
  @media screen and (max-width: 576px) {
    width: calc(100vw - 4rem);
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 20px;
  box-shadow: 0px 10px 10px 0px rgba(150, 150, 150, 0.3);
  border-radius: 8px;
`;

export const DogInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-;
  padding: 1rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.05) 10.96%,
    #000000 100%
  );
  border-radius: 8px;
`;

export const DogHeaderWrapper = styled.div`
  display: flex;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
`;

export const DogHeader = styled.span``;

export const DogDistance = styled.span`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const DogDescription = styled.span`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 400;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: -0.8rem;
`;

export const DogPassWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 1.5rem;
  right: -1rem;
  padding: 0;
`;

export const DogPassIcon = styled.img`
  width: 7rem;
  height: 7rem;
`;

export const DogFemaleIcon = styled(FemaleIcon)`
  font-size: 1.6rem;
`;

export const DogMaleIcon = styled(MaleIcon)`
  font-size: 1.6rem;
`;
