import styled from "@emotion/styled";
import { motion } from "framer-motion";

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
  font-size: 20px;
  box-shadow: 0px 10px 10px 0px rgba(150, 150, 150, 0.3);
  border-radius: 8px;
`;

export const DogInfoWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.05) 66.96%,
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
