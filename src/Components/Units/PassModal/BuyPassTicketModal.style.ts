import styled from "@emotion/styled";
import { Gray76, MainColor } from "../../../../styles/GlobalStyles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  svg {
    width: 2rem;
    height: 2rem;
    color: ${MainColor};
  }
`;

export const CautionText = styled.span`
  margin-top: 0.8rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

export const SubCautionText = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${Gray76};
  text-align: center;
  margin-top: 0.8rem;
`;

export const BuyButtonWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
