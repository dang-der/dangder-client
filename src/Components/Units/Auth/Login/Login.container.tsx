import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../Commons/Store/Auth/AccessToken";
import { IMutation, IMutationUserLoginArgs } from "../../../../Commons/Types/Generated/types";
import LoginUI from "./Login.presenter";
import { USER_LOGIN } from "./Login.queries"

export default function LoginContainer() {
  const router = useRouter()

  const [userLogin] = useMutation<Pick<IMutation, "userLogin">, IMutationUserLoginArgs>(USER_LOGIN)
  const [, setAccessToken] = useRecoilState(accessTokenState)
  

  const handleUserLogin = async (inputs: any) => { 
    console.log("onClickLogin", inputs);
    const result = await userLogin({ 
      variables: { ...inputs },
    })
    const accessToken = result.data?.userLogin || ''

    console.log('userLogin',accessToken)
    if (!accessToken) {
      alert("로그인에 실패였습니다. 다시 시도해 주세요.")
      
    }
    setAccessToken(accessToken )
    router.replace("/")
  };

  return <LoginUI
  
  handleUserLogin={handleUserLogin}
 
  />;
}