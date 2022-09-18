import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateMailTokenArgs,
  IMutationUpdateUserArgs,
  IMutationVerifyMailTokenArgs,
} from "../../../../Commons/Types/Generated/types";
import {
  CREATE_MAIL_TOKEN,
  VERIFY_MAIL_TOKEN,
} from "../SingUp/Page/SignUp.queries";
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
      const { data } = await createMailToken({ variables: { email } });

      if (!data) return false;

      return data.createMailToken;
    } catch (e) {
      console.log("createMailTokenError", e);
      return false;
    }
  };

  const handleVerifyMailToken = async (code: string, email: string) => {
    try {
      const { data } = await verifyMailToken({ variables: { email, code } });
      if (!data) return false;

      return data.verifyMailToken;
    } catch (e) {
      console.log("verifyMailTokenError", e);
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
