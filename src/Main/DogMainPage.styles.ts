import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const DogProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DogPhoto = styled.img`
  height: 50.8rem;
`;

export const DogInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 20px;
  bottom: 2rem;
`;

export const DogInfoHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
`;

export const DogName = styled.span`
  font-weight: 600;
  margin-right: 3px;
`;

export const DogAge = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const DogInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

export const DogDistance = styled.span`
  font-size: 1rem;
`;

export const DogPlay = styled.span`
  font-size: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SwipeButtons = styled.div`
  position: absolute;
  left: 10rem;
  bottom: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DislikeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 0.875rem;
  border: none;
  background-color: #ffffff;
  box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 3vw;
  color: #ec5e6f;
`;

export const LikeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 0.875rem;
  border: none;
  background-color: #ffffff;
  box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3) !important;
  border-radius: 50%;
  color: #76e2b3;
`;

export const PowerPassButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 0.875rem;
  border: none;
  background-color: #ffffff;
  box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  color: #915dd1;
`;
