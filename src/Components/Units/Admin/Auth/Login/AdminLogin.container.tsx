import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { adminAccessTokenState } from "../../../../../Commons/Store/Admin/AccessToken";
import { exceptionModalState } from "../../../../../Commons/Store/Modal/ModalVisibleState";
import {
  IMutation,
  IMutationAdminLoginArgs,
} from "../../../../../Commons/Types/Generated/types";
import AdminLoginUI from "./AdminLogin.presenter";
import { ADMIN_LOGIN } from "./AdminLogin.quries";

export default function AdminLoginContainer() {
  const [adminLogin] = useMutation<
    Pick<IMutation, "adminLogin">,
    IMutationAdminLoginArgs
  >(ADMIN_LOGIN);

  const router = useRouter();
  const client = useApolloClient();

  const [, setAdminAccessToken] = useRecoilState(adminAccessTokenState);
  const [, setExeptionModal] = useRecoilState(exceptionModalState);

  const handleAdminLogin = async (inputs: any) => {
    try {
      const result = await adminLogin({
        variables: { ...inputs },
      });
      const accessToken = result.data?.adminLogin || "";

      if (!accessToken) {
        alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
      }

      setAdminAccessToken(accessToken);
      router.replace("/main");
    } catch (e) {
      console.log("LoginError", e);
      if (e instanceof Error) {
        setExeptionModal({ visible: true, message: e.message });
      }
    }
  };

  return <AdminLoginUI handleAdminLogin={handleAdminLogin} />;
}
