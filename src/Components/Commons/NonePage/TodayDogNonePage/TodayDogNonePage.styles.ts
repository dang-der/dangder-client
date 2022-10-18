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
    margin-top: 9rem;
  }
`;

export const WaveOne = styled.div`
  width: 19.625rem;
  height: 19.625rem;
  border-radius: 50%;
  background: rgb(48, 79, 254, 0.06);
  object-fit: cover;
`;

export const TodayPickImageWrapper = styled.img`
  width: 11.75rem;
  height: 12.813rem;
  margin-top: -16rem;
`;
