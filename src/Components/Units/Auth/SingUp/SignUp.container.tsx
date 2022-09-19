import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { accessTokenState } from "../../../../Commons/Store/Auth/AccessToken";

import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateMailTokenArgs,
  IMutationCreateUserArgs,
  IMutationVerifyMailTokenArgs,
} from "../../../../Commons/Types/Generated/types";

import LoadingModal from "../../../Commons/Modal/Loading/LoadingModal";

import {
  CREATE_MAIL_TOKEN,
  CREATE_USER,
  VERIFY_MAIL_TOKEN,
} from "./Page/SignUp.queries";
import SignUpUI from "./SignUp.presenter";

export default function SignUpContainer() {
  const router = useRouter();

  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [,] = useRecoilState(accessTokenState);
  const [,] = useRecoilState(userInfoState);
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const [createMailToken] = useMutation<
    Pick<IMutation, "createMailToken">,
    IMutationCreateMailTokenArgs
  >(CREATE_MAIL_TOKEN);

  const [verifyMailToken] = useMutation<
    Pick<IMutation, "verifyMailToken">,
    IMutationVerifyMailTokenArgs
  >(VERIFY_MAIL_TOKEN);

  const handleCreateMailToken = async (email: string) => {
    console.log("handleCreateMailToken", email);
    if (!email) return false;

    setLoadingModalVisible(true);

    try {
      const { data } = await createMailToken({
        variables: {
          email,
          type: "signUp",
        },
      });

      setLoadingModalVisible(false);
      return data?.createMailToken;
    } catch (e) {
      console.log("handleCreateMailTokenError", e);
      setLoadingModalVisible(false);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }

      return false;
    }
  };

  const handleVerifyMailToken = async (email: string, code: string) => {
    console.log("handleVerifyMailToken", email, code);
    if (!code) return false;

    try {
      const { data } = await verifyMailToken({
        variables: {
          email,
          code,
        },
      });

      return data?.verifyMailToken;
    } catch (e) {
      console.log("verifyMailTokenError", e);
      return false;
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    console.log("handleSignUp", email, password);
    if (!password) return false;

    setLoadingModalVisible(true);
    try {
      const { data } = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
            pet: false,
            phone: "dddd",
          },
        },
      });

      setLoadingModalVisible(false);

      if (!data?.createUser.id) {
        throw Error("회원가입 실패. 관리자에게 문의하세요.");
      }

      router.replace(`/profile/init?user=${data.createUser.id}`);

      return (data?.createUser?.id?.length || "") > 0;
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
      return false;
    }
  };

  return (
    <>
      {loadingModalVisible && <LoadingModal />}
      <SignUpUI
        handleCreateMailToken={handleCreateMailToken}
        handleVerifyMailToken={handleVerifyMailToken}
        handleSignUp={handleSignUp}
      />
    </>
  );
}
