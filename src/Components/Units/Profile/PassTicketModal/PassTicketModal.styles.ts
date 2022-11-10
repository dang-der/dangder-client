import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/bg_ticket.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 2.5rem;
  span {
    padding: 0.5rem;
  }
`;

export const TextWrapper = styled.span`
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
`;

export const DogImageWrapper = styled.img`
  width: 22rem;
  height: 46rem;
  /* background-color: aliceblue; */
  /* object-fit: cover; */
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
