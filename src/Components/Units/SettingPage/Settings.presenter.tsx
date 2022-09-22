import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { userInfo } from "os";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../Commons/Store/Auth/UserInfoState";
import * as S from "./Settings.styles";

interface SettingsUIProps {
  handleUserLogout: () => Promise<void>;
  // handleDeleteUser: () => Promise<void>;
  handleClickModal: () => void;
  handleClickPasswordReset: () => void;
}

export default function SettingsUI({
  handleUserLogout,
  handleClickModal,
  handleClickPasswordReset,
}: SettingsUIProps) {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);
  console.log(handleUserLogout);

  const onClickLogout = () => {
    handleUserLogout();
  };

  const onClickLogin = () => {
    router.push("/auth/login");
  };

  const onClickModal = () => {
    handleClickModal();
  };

  const onClickPasswordReset = () => {
    handleClickPasswordReset();
  };

  return (
    <>
      <S.Wrapper>
        <S.SettingsWrapper>
          <S.SettingsContents>
            <S.SettingsTitle>문의</S.SettingsTitle>
            <S.SettingsLine></S.SettingsLine>
            <a href="http://pf.kakao.com/_xlksuxj">
              <S.SettingsSubContents>
                <S.SettingsSubTitle>플러스친구 방문하기</S.SettingsSubTitle>
                <S.SettingsSubIcon src={"/rightArrow.svg"} />
              </S.SettingsSubContents>
            </a>

            <a href="http://pf.kakao.com/_xlksuxj/chat">
              <S.SettingsSubContents>
                <S.SettingsSubTitle>1:1문의하기</S.SettingsSubTitle>
                <S.SettingsSubIcon src={"/rightArrow.svg"} />
              </S.SettingsSubContents>
            </a>
          </S.SettingsContents>
          <S.SettingsContents>
            <S.SettingsTitle>법적고지</S.SettingsTitle>
            <S.SettingsLine></S.SettingsLine>
            <S.SettingsSubContents>
              <S.SettingsSubTitle>라이선스</S.SettingsSubTitle>
              <S.SettingsSubIcon src={"/rightArrow.svg"} />
            </S.SettingsSubContents>
            <S.SettingsSubContents>
              <S.SettingsSubTitle>이용약관</S.SettingsSubTitle>
              <S.SettingsSubIcon src={"/rightArrow.svg"} />
            </S.SettingsSubContents>
          </S.SettingsContents>
          <S.SettingsApiContents>
            <S.SettingsLine></S.SettingsLine>
            <S.SettingsApiTitle>
              <S.SettingsApi
                onClick={userInfo?.user ? onClickLogout : onClickLogin}
              >
                {userInfo?.user ? "로그아웃" : "로그인"}
              </S.SettingsApi>
            </S.SettingsApiTitle>
            <S.SettingsApiTitle>
              <S.SettingsApi onClick={onClickPasswordReset}>
                비밀번호 변경
              </S.SettingsApi>
            </S.SettingsApiTitle>
            <S.SettingsBottom>
              <S.SettingsApiSubTitle>
                <S.SettingsVersion>버전 1.0.0</S.SettingsVersion>
              </S.SettingsApiSubTitle>
              {userInfo?.user && (
                <S.SettingsApiSubTitle>
                  <S.SettingsDelete onClick={onClickModal}>
                    계정 삭제하기
                  </S.SettingsDelete>
                </S.SettingsApiSubTitle>
              )}
            </S.SettingsBottom>
          </S.SettingsApiContents>
        </S.SettingsWrapper>
      </S.Wrapper>
    </>
  );
}
