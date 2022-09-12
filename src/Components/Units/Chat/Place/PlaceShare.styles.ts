import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: 576px) {
    width: 576px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ButtonWrapper = styled.div`
  width: 85%;
  position: absolute;
  bottom: 2rem;
  z-index: 2;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
`;
