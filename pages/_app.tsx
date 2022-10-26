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
import UseCheckVisit from "../src/Commons/Library/UseCheckVisit";
import { AdminGlobalStyles } from "../styles/AdminGlobalStyles";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log((router.pathname).includes('admin'))

  return (
    <Wrapper>
      <RecoilRoot>
        <UseCheckVisit />
        <AuthModal />
        <ExceptionModal />
        <SuccessSnack />

        {(router.pathname).includes('admin') ? (<ApolloSetting>
          <Global styles={AdminGlobalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloSetting>) : (<ApolloSetting>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloSetting>)}
      </RecoilRoot>
    </Wrapper>
  );
}

export default MyApp;
