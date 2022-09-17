import styled from "@emotion/styled";
import { Gray76 } from "../../../../../styles/GlobalStyles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

export const IconWrapper = styled.div`
  color: red;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const CautionText = styled.span`
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
`;

export const SubCautionText = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${Gray76};
  text-align: center;
  margin-top: 0.8rem;
`;

export const DeleteButton = styled.div`
  width: 13rem;
  height: 1.9rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #304ffe;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  border-radius: 6.25rem;
  cursor: pointer;
`;
