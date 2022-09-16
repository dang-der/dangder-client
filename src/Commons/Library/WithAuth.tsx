import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authModalVisibleState } from "../Store/Modal/ModalVisibleState";

import { getAccessToken } from "./getAccessToken";

export const withAuth = (Component: ReactNode) => (props: any) => {
  const router = useRouter();

  const [, setAuthModalVisible] = useRecoilState(authModalVisibleState);

  useEffect(() => {
    getAccessToken().then((token) => {
      if (!token) {
        setAuthModalVisible((p) => !p);
        router.replace("/auth/login");
      }
    });
  }, []);

  return <Component {...props} />;
};
