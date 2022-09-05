import styled from "@emotion/styled";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const LocationWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100vw;
  height: 5rem;
  padding: 1.5rem;
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

export const DogCardWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100vw;
`;

export const DogProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 37.25rem;
  box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-color: #fff;
`;

export const DogInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 1.25rem;
  bottom: 2rem;
`;

export const DogInfoHeader = styled.header`
  width: 18.438rem;
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
  position: relative;
  left: 20.625rem;
  top: 35.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 3.2rem;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

export const SparkIcon = styled(FlashOnIcon)`
  color: #304ffe;
  font-size: 1.8rem;
`;
