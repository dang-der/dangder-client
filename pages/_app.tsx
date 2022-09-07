import { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../styles/GlobalStyles";
import "antd/dist/antd.css";
import { RecoilRoot } from "recoil";
import Layout from "../src/Components/Commons/layout";
import ApolloSetting from "../src/Commons/Settings/apollosetting";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ApolloSetting>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </ApolloSetting>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
