import styled from "@emotion/styled";
import { Gray76, SubColor } from "../../../../../../styles/GlobalStyles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
`;

export const TitleWrapper = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${Gray76};
  margin-bottom: 1rem;
`;

export const MapWrapper = styled.div`
  width: 80%;
  height: 10rem;
  border-radius: 1.635rem;
`;

export const ButtonWrapper = styled.button`
  cursor: pointer;
  border: none;
  width: 80%;
  background-color: ${SubColor};
  height: 3.2rem;
  margin-top: 0.7rem;
  border-radius: 1.635rem;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
`;
