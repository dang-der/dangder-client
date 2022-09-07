import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { IMutation, IMutationCreateMailTokenArgs, IMutationCreateUserArgs, IMutationVerifyMailTokenArgs } from "../../../../Commons/Types/Generated/types";
import { CREATE_MAIL_TOKEN, CREATE_USER, VERIFY_MAIL_TOKEN } from "./Page/SignUp.queries";
import SignUpUI from "./SignUp.presenter";

export default function SignUpContainer() {
  const router = useRouter()
  const [createUser] = useMutation<Pick<IMutation, "createUser">, IMutationCreateUserArgs>(CREATE_USER)
  const [createMailToken] = useMutation<Pick<IMutation, "createMailToken">, IMutationCreateMailTokenArgs>(CREATE_MAIL_TOKEN)
  const [verifyMailToken] = useMutation<Pick<IMutation, "verifyMailToken">, IMutationVerifyMailTokenArgs>(VERIFY_MAIL_TOKEN)

  const handleSignUp = async (inputs: any) => {
    try {
    const result = await createUser({
      variables: {
        createUserInput: {
          ...inputs,
        },
      },
    });
    alert("회원가입을 축하드립니다.");
    router.replace("/");
  } catch (error) {
    if (error instanceof Error) Modal.error({content: error.message})
  }
  }

  return <SignUpUI 
  handleSignUp={handleSignUp}
  />;
}
