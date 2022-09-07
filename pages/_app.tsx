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
        <ApolloSetting>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloSetting>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
