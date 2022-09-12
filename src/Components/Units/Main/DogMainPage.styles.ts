import styled from "@emotion/styled";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TinderCard from "react-tinder-card";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

export const LocationWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 5rem;
  padding: 0.625rem 1.5rem;
`;

export const LocationButton = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px #0000001f;
`;

export const LocationIcon = styled(MyLocationIcon)`
  color: #767676;
  font-size: 2rem;
`;

export const DogCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const TinderCardWrapper = styled(TinderCard)`
  position: absolute;
  width: calc(576px - 4rem);
  max-width: 576px;
  height: calc(100vh - 17rem);
  @media screen and (max-width: 576px) {
    width: calc(100vw - 4rem);
  }
`;

export const DogProfile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 10px 0px rgba(150, 150, 150, 0.3);
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-color: #fff;
  padding: 1rem;
  z-index: -1;
`;

export const DogInfo = styled.div`
  width: 100%;
`;

export const DogInfoHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DogInfoTitle = styled.div``;

export const DogName = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 3px;
`;

export const DogAge = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const DogInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

export const DistanceWrapper = styled.div`
  display: flex;
`;

export const DogDistance = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const DogPlay = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const PassButton = styled.div`
  position: absolute;
  right: -1rem;
  bottom: -1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 4px 4px 0px #00000040;
  z-index: 2;
`;

export const SparkIcon = styled(FlashOnIcon)`
  color: #304ffe;
  font-size: 1.8rem;
`;
