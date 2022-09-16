import styled from "@emotion/styled";
import { SubColor } from "../../../../../styles/GlobalStyles";

export const PlaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: 575px) {
    width: 576px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 85%;
  position: absolute;
  bottom: 2rem;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
`;

export const PlaceButtonWrapper = styled.div`
  width: 100%;
`;

export const CurrentPositionWrapper = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: ${SubColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;
  cursor: pointer;
  svg {
    color: white;
    width: 2rem;
    height: 2rem;
  }
`;
