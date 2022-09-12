import styled from "@emotion/styled";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 10px;
`;

export const DogProfileWrapper = styled.div``;

export const DogProfileHeader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: 700;
`;

export const DogProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

export const DogPhoto = styled.img`
  width: 23.7rem;
  height: 24rem;
  border-radius: 10px;
  box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3);
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

export const ProfileEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20px auto;
  width: 7.8rem;
  height: 2.7rem;
  border: none;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: #ffffff;
  box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 1;
`;

export const DogMoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24.3rem;
  height: 9rem;
  background-color: #f1f1f1;
  border-radius: 20px;
  padding: 5px;
  margin-top: 30px;
`;

export const DogMoneyHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const title = styled.span``;

export const InfomationIcon = styled(InfoIcon)`
  font-size: 1.25rem;
`;

export const DogMoneyBody = styled.div``;

export const Amount = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const LeftArrowIcon = styled(KeyboardArrowLeftIcon)`
  font-size: 1.25rem;
`;

export const DogMoneyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.5rem;
  height: 1.875rem;
  color: #ffffff;
  background-color: #304ffe;
  border-radius: 15px;
`;

export const DogProfileSetting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 2px;
  margin-top: 20px;
`;

export const SettingButton = styled.div``;

export const RightArrowIcon = styled(KeyboardArrowRightIcon)``;
