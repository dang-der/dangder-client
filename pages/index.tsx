import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { visitedState } from "../src/Commons/Store/Auth/AccessToken";
import { userInfoState } from "../src/Commons/Store/Auth/UserInfoState";
import Landing from "../src/Components/Units/Landing/LandingPage.container";

export default function MainPage() {
  const router = useRouter();
  const [visited] = useRecoilState(visitedState);
  const [userInfo] = useRecoilState(userInfoState);

  useLayoutEffect(() => {
    if (!userInfo) return;
    router.replace("/main");
  }, []);

  return visited && <Landing />;
}
