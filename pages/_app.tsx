import { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles, Wrapper } from "../styles/GlobalStyles";
import "antd/dist/antd.css";

import { RecoilRoot } from "recoil";
import Layout from "../src/Components/Commons/layout";
import ApolloSetting from "../src/Commons/Settings/apollosetting";
import AuthModal from "../src/Components/Commons/Modal/AuthModal/AuthModal";
import ExceptionModal from "../src/Components/Commons/Modal/ExceptionModal/ExceptionModal";
import SuccessSnack from "../src/Components/Commons/Modal/SuccessSnack/SuccessSnack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <RecoilRoot>
        <AuthModal />
        <ExceptionModal />
        <SuccessSnack />
        <ApolloSetting>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloSetting>
      </RecoilRoot>
    </Wrapper>
  );
}

export default MyApp;
