import { AppProps } from "next/app";
import {Global} from "@emotion/react"
import {globalStyles} from "../styles/GlobalStyles"
import "antd/dist/antd.css"; 
import { RecoilRoot } from "recoil";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
