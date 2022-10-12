import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { visitedState } from "../../src/Commons/Store/Auth/AccessToken";
import Intro from "../../src/Components/Units/Intro/IntroSearch/IntroSearch.container";

export default function IntroPage() {
  const [, setVisited] = useRecoilState(visitedState);

  useEffect(() => {
    setVisited(true);
  }, []);
  return <Intro />;
}
