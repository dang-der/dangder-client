import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FETCH_LOGIN_USER } from "../../Components/Units/Auth/Login/Login.queries";
import { userInfoState } from "../Store/Auth/UserInfoState";
import { IQuery } from "../Types/Generated/types";

export const FetchLoginUserHook = () => {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const { data } = useQuery<Pick<IQuery, "fetchLoginUser">>(FETCH_LOGIN_USER);

  useEffect(() => {
    console.log("FetchLoginUser", data);
    if (!data?.fetchLoginUser) return;

    setUserInfo(data.fetchLoginUser);
  }, [data]);
  return <></>;
};
