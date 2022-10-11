import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { visitedState } from "../Store/Auth/AccessToken";

const useCheckVisit = () => {
  const router = useRouter();
  const [visited] = useRecoilState(visitedState);

  useEffect(() => {
    if (visited) return;
    router.push("/intro");
  }, []);

  return null;
};

export default useCheckVisit;
