import styled from "@emotion/styled";
import { motion } from "framer-motion";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { MainColor } from "../../../../styles/GlobalStyles";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.1rem;
  padding: 2.5rem;
`;

export const InterestTitleWrapper = styled.div``;

export const InterestTitle = styled.div`
  /* display: flex;
  justify-content: center; */
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 1rem;
  color: #000000;
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
  padding: 1.5rem;
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
  right: -0.8rem;
  padding: 0;
`;

export const DogPassIcon = styled.img`
  width: 6rem;
  height: 6rem;
`;

export const DogFemaleIcon = styled(FemaleIcon)`
  font-size: 1.6rem;
`;

export const DogMaleIcon = styled(MaleIcon)`
  font-size: 1.6rem;
`;

export const PositionButtonWrapper = styled.div`
  width: 100%;
  height: 3rem;
  align-self: flex-start;
  justify-self: flex-start;
  display: flex;
  align-items: center;
  text-align: start;
  margin-left: 1.5rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${MainColor};
    /* padding: 0.3rem; */
  }
`;

export const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 10px 10px 0px rgba(150, 150, 150, 0.3);
`;

export const PageTitleWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 1rem;
  width: 100%;
`;