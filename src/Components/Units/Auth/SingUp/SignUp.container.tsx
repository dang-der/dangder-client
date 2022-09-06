import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { CREATE_USER } from "./Page/SignUp.queries";
import SignUpUI from "./SignUp.presenter";

export default function SignUpContainer() {
  const router = useRouter()
  const [createUser] = useMutation<Pick<IMutation, "createUser">, IMutationCreateUserArgs>(CREATE_USER)

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
