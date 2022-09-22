import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  dogInfoInputState,
  regNumInputState,
  signUpInputState,
} from "../../../../Commons/Store/Auth/SignUpState";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateDogArgs,
  IMutationCreateMailTokenArgs,
  IMutationCreateUserArgs,
  IMutationGetDogInfoArgs,
  IMutationUploadFileArgs,
  IMutationVerifyMailTokenArgs,
  IQuery,
} from "../../../../Commons/Types/Generated/types";
import { emailSchema } from "./Page/EmailInputPage";
import SignUpUI from "./SignUp.presenter";
import {
  CREATE_MAIL_TOKEN,
  CREATE_USER,
  VERIFY_MAIL_TOKEN,
} from "./SignUp.queries";

import * as yup from "yup";
import LoadingModal from "../../../Commons/Modal/Loading/LoadingModal";
import {
  CREATE_DOG,
  FETCH_AVOID_BREEDS,
  FETCH_CHARACTERS,
  FETCH_INTERESTS,
  GET_DOG_INFO,
  UPLOAD_FILE,
} from "../../Profile/Init/InitProfile.queries";
import useGeolocation from "react-hook-geolocation";
import { snackBarState } from "../../../../Commons/Store/Modal/SnackBarState";

export default function SignUpContainer() {
  const router = useRouter();
  const geo = useGeolocation();

  const [signUpInputs, setSignUpInputs] = useRecoilState(signUpInputState);
  const [regNumInputs, setRegNumInputs] = useRecoilState(regNumInputState);
  const [dogInfoInputs, setDogInfoInputs] = useRecoilState(dogInfoInputState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);
  const [, setSnackBar] = useRecoilState(snackBarState);

  const [currentPage, setCurrentPage] = useState(0);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const { data: charactersData } =
    useQuery<Pick<IQuery, "fetchCharacters">>(FETCH_CHARACTERS);

  const { data: interestsData } =
    useQuery<Pick<IQuery, "fetchInterests">>(FETCH_INTERESTS);

  const { data: avoidBreedsData } =
    useQuery<Pick<IQuery, "fetchAvoidBreeds">>(FETCH_AVOID_BREEDS);

  const [createMailToken] = useMutation<
    Pick<IMutation, "createMailToken">,
    IMutationCreateMailTokenArgs
  >(CREATE_MAIL_TOKEN);

  const [verifyMailToken] = useMutation<
    Pick<IMutation, "verifyMailToken">,
    IMutationVerifyMailTokenArgs
  >(VERIFY_MAIL_TOKEN);

  const [getDogInfo] = useMutation<
    Pick<IMutation, "getDogInfo">,
    IMutationGetDogInfoArgs
  >(GET_DOG_INFO);

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

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

  const handleCreateMailToken = async () => {
    if (!yup.string().email().isValidSync(signUpInputs.email)) {
      return;
    }

    try {
      if (!signUpInputs.email) {
        throw Error("이메일이 입력되지 않았습니다.");
      }

      setLoadingModalVisible(true);

      const { data } = await createMailToken({
        variables: {
          email: signUpInputs.email,
          type: "signUp",
        },
      });

      if (!data?.createMailToken) throw Error("이메일 전송에 실패했습니다.");

      setLoadingModalVisible(false);
      handleNextPage();
    } catch (e) {
      setLoadingModalVisible(false);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }
    }
  };

  const handleVerifyMailToken = async () => {
    try {
      if (!signUpInputs.authenticationCode.join("")) {
        throw Error("인증번호가 입력되지 않았습니다.");
      }

      const { data } = await verifyMailToken({
        variables: {
          email: signUpInputs.email,
          code: signUpInputs.authenticationCode.join(""),
        },
      });

      if (!data?.verifyMailToken) throw Error("인증번호가 일치하지 않습니다.");
      handleNextPage();
    } catch (e) {
      console.log("verifyMailTokenError", e);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }
    }
  };

  const handleCheckPassword = () => {
    if (!signUpInputs.password.includes(signUpInputs.passwordCheck)) return;
    if (
      !yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/)
        .required()
        .isValidSync(signUpInputs.password)
    )
      return;
    handleNextPage();
  };

  const handleCheckDogRegisterNumber = async () => {
    console.log("handleCheckDog");
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

  const handleCreateUserAndDog = async () => {
    const birth =
      String(regNumInputs.ownerBirthYear).substring(2) +
      String(regNumInputs.ownerBirthMonth).padStart(2, "0") +
      String(regNumInputs.ownerBirthDay).padStart(2, "0");

    try {
      const { data } = await createUser({
        variables: {
          createUserInput: {
            email: signUpInputs.email,
            password: signUpInputs.password,
            pet: false,
            phone: "000-0000-0000",
          },
        },
      });

      if (!data?.createUser.id)
        throw Error("회원가입 실패. 관리자에게 문의하세요.");

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
            avoidBreeds: dogInfoInputs.avoid,
            locations: {
              lat: geo.latitude || 0,
              lng: geo.longitude || 0,
            },
            img: filesData.uploadFile,
            userId: data.createUser.id,
          },
          dogRegNum: regNumInputs.registerNumber,
          ownerBirth: birth,
        },
      });

      if (!createDogData?.createDog) throw Error("강아지 등록에 실패했습니다.");

      setSnackBar({
        visible: true,
        message: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
      });
      router.replace("/auth/login");
      initState();
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
    setSignUpInputs({
      email: "",
      password: "",
      passwordCheck: "",
      authenticationCode: Array(4).fill(0),
      isActiveButton: false,
    });

    setDogInfoInputs({
      imageUrls: [],
      imageFiles: [],
      age: 0,
      introduce: "",
      characters: [],
      interests: [],
      avoid: [],
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
      <SignUpUI
        currentPageIndex={currentPage}
        handlePrevPage={handlePrevPage}
        handleCreateMailToken={handleCreateMailToken}
        handleVerifyMailToken={handleVerifyMailToken}
        handleCheckPassword={handleCheckPassword}
        handleCheckDogRegisterNumber={handleCheckDogRegisterNumber}
        handleProfileInput={handleProfileInput}
        handleCreateUserAndDog={handleCreateUserAndDog}
        charactersData={charactersData}
        interestsData={interestsData}
        avoidBreedsData={avoidBreedsData}
      />
    </>
  );
}
