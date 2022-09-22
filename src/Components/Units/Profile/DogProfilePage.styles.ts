import styled from "@emotion/styled";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const DogProfileWrapper = styled.div`
  width: calc(576px - 4rem);
  max-width: 576px;
  height: calc(100vh - 20rem);
  @media screen and (max-width: 576px) {
    width: calc(100vw - 4rem);
  }
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

export const DogProfileHeader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: 700;
`;

export const DogProfile = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
`;

export const DogProfileImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface DogPhotoStyleProps {
  imageUrl: string;
}

export const DogPhoto = styled.div`
  width: calc(576px - 4rem);
  max-width: 576px;
  height: calc(100vh - 20rem);
  @media screen and (max-width: 576px) {
    width: calc(100vw - 4rem);
  }
  object-fit: cover;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.05) 70%,
      rgba(0, 0, 0, 0.7) 85%,
      #000000 116.48%
    ),
    url(${(props: DogPhotoStyleProps) => props.imageUrl});
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
  margin-left: 1rem;
`;

export const DogName = styled.span`
  color: #ffffff;
  font-size: 1.875rem;
  font-weight: 700;
  margin-right: 3px;
`;

export const DogAge = styled.span`
  color: #ffffff;
  font-size: 1.875rem;
  font-weight: 700;
`;

export const DogInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  /* margin-left: 1rem; */
`;

export const DogDescription = styled.span`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 400;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  /* margin-left: -0.8rem; */
`;

export const ProfileEditButtonWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  bottom: 0;
  margin-top: -0.7rem;
`;

export const ProfileEditButton = styled.div`
  position: relative;
  bottom: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.625rem;
  height: 3.125rem;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  background-color: #304ffe;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 30px;
  z-index: 1;
`;

export const SettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  background-color: #ffffff;
  margin-top: 20px;
`;

export const DogProfileSetting = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 0;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
`;

export const SettingSpan = styled.span`
  color: #040404;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 1rem;
`;

export const RightArrowIcon = styled(KeyboardArrowRightIcon)`
  color: #040404;
  font-size: 1.5rem;
`;
