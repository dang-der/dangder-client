import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateDogArgs,
  IMutationGetDogInfoArgs,
  IMutationUploadFileArgs,
  IQuery,
} from "../../../../Commons/Types/Generated/types";

import LoadingModal from "../../../Commons/Modal/Loading/LoadingModal";
import InitProfileUI from "./InitProfile.presenter";
import {
  CREATE_DOG,
  FETCH_CHARACTERS,
  FETCH_INTERESTS,
  GET_DOG_INFO,
  UPLOAD_FILE,
} from "./InitProfile.queries";
import {
  dogInfoInputState,
  regNumInputState,
} from "../../../../Commons/Store/Auth/SignUpState";

import * as yup from "yup";
import {
  FETCH_LOGIN_USER,
  FETCH_ONLY_USER,
} from "../../Auth/Login/Login.queries";
import { useRouter } from "next/router";
import { snackBarState } from "../../../../Commons/Store/Modal/SnackBarState";

import { getAccessToken } from "../../../../Commons/Library/getAccessToken";

export default function InitProfileContainer() {
  const router = useRouter();
  const geo = useGeolocation();
  const client = useApolloClient();

  const [regNumInputs, setRegNumInputs] = useRecoilState(regNumInputState);
  const [dogInfoInputs, setDogInfoInputs] = useRecoilState(dogInfoInputState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [, setSnackBar] = useRecoilState(snackBarState);

  const [currentPage, setCurrentPage] = useState(0);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const { data: charactersData } =
    useQuery<Pick<IQuery, "fetchCharacters">>(FETCH_CHARACTERS);

  const { data: interestsData } =
    useQuery<Pick<IQuery, "fetchInterestCategory">>(FETCH_INTERESTS);

  const [getDogInfo] = useMutation<
    Pick<IMutation, "getDogInfo">,
    IMutationGetDogInfoArgs
  >(GET_DOG_INFO);

  const [createDog] = useMutation<
    Pick<IMutation, "createDog">,
    IMutationCreateDogArgs
  >(CREATE_DOG);

  const [uploadFiles] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const handleNextPage = () => {
    if (currentPage + 1 > 5) return;
    setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 0) {
      router.replace("/auth/login");
      return;
    }

    setCurrentPage((p) => p - 1);
  };

  const handleCheckDogRegisterNumber = async () => {
    if (
      !yup
        .string()
        .max(15)
        .required()
        .isValidSync(regNumInputs.registerNumber) ||
      !yup
        .string()
        .max(4)
        .required()
        .isValidSync(regNumInputs.ownerBirthYear) ||
      !yup
        .string()
        .max(2)
        .required()
        .isValidSync(regNumInputs.ownerBirthMonth) ||
      !yup.string().max(2).required().isValidSync(regNumInputs.ownerBirthDay)
    ) {
      return;
    }

    const birth =
      String(regNumInputs.ownerBirthYear).substring(2) +
      String(regNumInputs.ownerBirthMonth).padStart(2, "0") +
      String(regNumInputs.ownerBirthDay).padStart(2, "0");

    try {
      setLoadingModalVisible(true);
      const { data } = await getDogInfo({
        variables: {
          dogRegNum: regNumInputs.registerNumber,
          ownerBirth: birth,
        },
      });

      if (!data?.getDogInfo) throw Error("등록된 댕댕이가 아닙니다.");

      handleNextPage();
    } catch (e) {
      console.log("handleCheckDogRegister", e);
      setExceptionModal({
        visible: true,
        message: "댕댕이를 찾을 수 없습니다.<br/> 입력한 정보를 확인해주세요.",
      });
    } finally {
      setLoadingModalVisible(false);
    }
  };

  const handleProfileInput = () => {
    if (!dogInfoInputs.imageUrls[0] || !dogInfoInputs.imageFiles[0]) {
      setExceptionModal({
        visible: true,
        message: "이미지 등록은 필수입니다.",
      });
      return;
    }

    if (dogInfoInputs.age === 0 || !dogInfoInputs.introduce) return;

    handleNextPage();
  };

  const handleCreateDog = async () => {
    try {
      const newToken = await getAccessToken();

      const { data: userInfo } = await client.query<
        Pick<IQuery, "fetchSocialLoginUser">
      >({
        query: FETCH_ONLY_USER,
        context: {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        },
      });

      if (!userInfo.fetchSocialLoginUser?.id)
        throw Error("회원정보가 없습니다.");

      const birth =
        String(regNumInputs.ownerBirthYear).substring(2) +
        String(regNumInputs.ownerBirthMonth).padStart(2, "0") +
        String(regNumInputs.ownerBirthDay).padStart(2, "0");

      const { data: filesData } = await uploadFiles({
        variables: { files: dogInfoInputs.imageFiles },
      });

      if (!filesData)
        throw Error("이미지 업로드에 실패했습니다. <br/> 다시 시도해주세요.");

      const { data: createDogData } = await createDog({
        variables: {
          createDogInput: {
            age: dogInfoInputs.age,
            description: dogInfoInputs.introduce,
            interests: dogInfoInputs.interests,
            characters: dogInfoInputs.characters,

            locations: {
              lat: geo.latitude || 0,
              lng: geo.longitude || 0,
            },
            img: filesData.uploadFile,
            userId: userInfo.fetchSocialLoginUser.id,
          },
          dogRegNum: regNumInputs.registerNumber,
          ownerBirth: birth,
        },
      });

      if (!createDogData?.createDog) throw Error("강아지 등록에 실패했습니다.");

      setSnackBar({
        visible: true,
        message: "강아지 등록 성공!",
      });
      router.replace("/main");
    } catch (e) {
      if (e instanceof Error) {
        setExceptionModal({
          visible: true,
          message: e.message,
        });
      }
    }
  };

  const initState = () => {
    setDogInfoInputs({
      imageUrls: [],
      imageFiles: [],
      age: 0,
      introduce: "",
      characters: [],
      interests: [],
    });

    setRegNumInputs({
      registerNumber: "",
      ownerBirthYear: 0,
      ownerBirthDay: 0,
      ownerBirthMonth: 0,
    });
  };

  return (
    <>
      {loadingModalVisible && <LoadingModal />}
      <InitProfileUI
        currentPageIndex={currentPage}
        handleCheckDogRegisterNumber={handleCheckDogRegisterNumber}
        handleCreateDog={handleCreateDog}
        handlePrevPage={handlePrevPage}
        handleProfileInput={handleProfileInput}
        charactersData={charactersData}
        interestsData={interestsData}
      />
    </>
  );
}
