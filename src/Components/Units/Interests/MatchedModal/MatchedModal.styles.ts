import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    text-align: center;
    margin-top: 2.5rem;
  }
`;

export const DogImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 100%;
    position: absolute;
    z-index: -1;

    margin-bottom: 4rem;
  }
`;

export const DogImage = styled.img`
  width: 10.625rem;
  height: 10.625rem;
  border-radius: 50%;
  background-color: aliceblue;
  object-fit: cover;
`;

export const CloseIconWrapper = styled.div`
  align-self: flex-end;
  position: relative;
  top: 2rem;
  right: 2rem;
  svg {
    width: 2rem;
    height: 2rem;
    color: white;
  }
`;
