import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationCreateMailTokenArgs,
  IMutationUpdateUserArgs,
  IMutationVerifyMailTokenArgs,
} from "../../../../Commons/Types/Generated/types";
import { CREATE_MAIL_TOKEN, VERIFY_MAIL_TOKEN } from "../SingUp/SignUp.queries";
import PasswordResetUI from "./PasswordReset.presenter";

const UPDATE_USER = gql`
  mutation updateUser($email: String!, $updateUserInput: UpdateUserInput!) {
    updateUser(email: $email, updateUserInput: $updateUserInput) {
      id
    }
  }
`;

export default function PasswordResetContainer() {
  const router = useRouter();
  const [, setExceptionModal] = useRecoilState(exceptionModalState);

  const [createMailToken] = useMutation<
    Pick<IMutation, "createMailToken">,
    IMutationCreateMailTokenArgs
  >(CREATE_MAIL_TOKEN);

  const [verifyMailToken] = useMutation<
    Pick<IMutation, "verifyMailToken">,
    IMutationVerifyMailTokenArgs
  >(VERIFY_MAIL_TOKEN);

  const [updateUser] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);

  const handelCreateMailToken = async (email: string) => {
    try {
      const { data } = await createMailToken({
        variables: { email, type: "resetPwd" },
      });

      if (!data) {
        throw Error("이메일 전송에 실패했습니다.");
      }

      return data.createMailToken;
    } catch (e) {
      console.log("createMailTokenError", e);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }
      return false;
    }
  };

  const handleVerifyMailToken = async (code: string, email: string) => {
    try {
      const { data } = await verifyMailToken({ variables: { email, code } });
      if (!data) {
        throw Error("인증번호 검사에 실패앴습니다.");
      }

      return data.verifyMailToken;
    } catch (e) {
      console.log("verifyMailTokenError", e);
      if (e instanceof Error) {
        setExceptionModal({ visible: true, message: e.message });
      }
      return false;
    }
  };

  const handleUpdateUser = async (email: string, password: string) => {
    try {
      const { data } = await updateUser({
        variables: {
          email,
          updateUserInput: {
            password,
          },
        },
      });

      console.log("updateUser", data?.updateUser);
      if (data?.updateUser.id) router.replace("/auth/login");
    } catch (e) {
      console.log("updateUserError", e);
    }
  };

  return (
    <PasswordResetUI
      handleCreateMailToken={handelCreateMailToken}
      handleVerifyMailToken={handleVerifyMailToken}
      handleUpdateUser={handleUpdateUser}
    />
  );
}
