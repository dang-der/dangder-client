import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: #000000;
    font-weight: 500;
    font-size: 1rem;
    text-align: center;
    margin-top: 10rem;
  }
`;

export const WaveOne = styled.div`
  width: 19.625rem;
  height: 19.625rem;
  border-radius: 50%;
  background: rgb(48, 79, 254, 0.06);
  object-fit: cover;
`;

export const WaveTwo = styled.div`
  width: 15.125rem;
  height: 15.125rem;
  border-radius: 50%;
  background: rgba(48, 79, 254, 0.2);
  object-fit: cover;
  margin-top: -17.5rem;
`;

export const DogImageWrapper = styled.img`
  width: 10.625rem;
  height: 10.625rem;
  border-radius: 50%;
  background-color: aliceblue;
  object-fit: cover;
  margin-top: -12.9rem;
`;
