import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../../Commons/Library/getAccessToken";
import { IQuery } from "../../../../Commons/Types/Generated/types";
import LoadingModal from "../../../Commons/Modal/Loading/LoadingModal";
import { FETCH_ONLY_USER } from "../Login/Login.queries";

/**
 * 댕댕이 등록 여부에 따른 페이지 이동 분기 처리를 위한 container
 */
export default function RedirectContainer() {
  const router = useRouter();
  const client = useApolloClient();

  const [loadingModalVisible, setLoadingModalVisible] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token: string = (await getAccessToken()) || "";

      const { data: userInfo } = await client.query<
        Pick<IQuery, "fetchSocialLoginUser">
      >({
        query: FETCH_ONLY_USER,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (userInfo.fetchSocialLoginUser.pet) {
        router.replace("/main");
        return;
      }
      router.replace("/profile/init");
    } catch (e) {
      // 에러 발생시 다이얼로그 띄우기...
      router.back();
    }finally{
        setLoadingModalVisible(false)
    }
  };

  return <>{loadingModalVisible && <LoadingModal />}</>;
}
