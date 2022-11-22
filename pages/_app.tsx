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
import {
  AdminGlobalStyles,
  AdminWrapper,
  ContentsWrapper,
} from "../styles/AdminGlobalStyles";
import { useRouter } from "next/router";
import AdminNavigation from "../src/Components/Commons/layout/admin_navigation";


const SHOW_ADMIN_NAVIGATION = [
  "/admin/users",
  "/admin/dogs",
  "/admin/reports",
  "/admin/blocks",
  "/admin/payments",
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isShowAdminNavigation = SHOW_ADMIN_NAVIGATION.includes(router.pathname);
  return (
    <>
      {router.pathname.includes("admin") ? (
        <AdminWrapper>
          <RecoilRoot>
            <ApolloSetting>
              <Global styles={AdminGlobalStyles} />
              {isShowAdminNavigation && <AdminNavigation />}
              <ContentsWrapper>
                <Component {...pageProps} />
              </ContentsWrapper>
            </ApolloSetting>
          </RecoilRoot>
        </AdminWrapper>
      ) : (
        <Wrapper>
          <RecoilRoot>
            <UseCheckVisit />
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
      )}
    </>
  );
}

export default MyApp;
