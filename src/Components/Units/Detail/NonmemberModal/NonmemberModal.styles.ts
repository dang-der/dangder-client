import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: white;
    font-weight: 500;
    font-size: 1rem;
    text-align: center;
    margin-top: 2.5rem;
  }
`;

export const DogImageWrapper = styled.img`
  width: 10.625rem;
  height: 10.625rem;
  border-radius: 50%;
  background-color: aliceblue;
  object-fit: cover;
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
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

