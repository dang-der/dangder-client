import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../Commons/Store/Auth/AccessToken";
import { userInfoState } from "../../../../Commons/Store/Auth/UserInfoState";
import { exceptionModalState } from "../../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationUserLoginArgs,
} from "../../../../Commons/Types/Generated/types";
import LoginUI from "./Login.presenter";
import { FETCH_LOGIN_USER, USER_LOGIN } from "./Login.queries";

export default function LoginContainer() {
  const router = useRouter();
  const client = useApolloClient();

  const [userLogin] = useMutation<
    Pick<IMutation, "userLogin">,
    IMutationUserLoginArgs
  >(USER_LOGIN);

  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [, setExeptionModal] = useRecoilState(exceptionModalState);

  const handleUserLogin = async (inputs: any) => {

    try {
      const result = await userLogin({
        variables: { ...inputs },
      });
      const accessToken = result.data?.userLogin || "";

      if (!accessToken) {
        alert("로그인에 실패였습니다. 다시 시도해 주세요.");
      }

      setAccessToken(accessToken);

      const { data } = await client.query({ query: FETCH_LOGIN_USER });
      if (!data) return;
      setUserInfo(data.fetchLoginUser);

      router.replace("/");
    } catch (e) {
      console.log("LoginError", e);
      if (e instanceof Error) {
        setExeptionModal({ visible: true, message: e.message });
      }
    }

  };

  return <LoginUI handleUserLogin={handleUserLogin} />;
}
