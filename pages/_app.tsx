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
import AdminNavigation from "../src/Components/Commons/layout/admin_navigation";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const SHOW_ADMIN_NAVIGATION = [
    "/admin/user",
    "/admin/dogs",
    "/admin/report",
    "/admin/block",
    "/admin/payments",
  ];

  const isShowAdminNavigation = SHOW_ADMIN_NAVIGATION.includes(router.pathname);

  return (
    <>
      {router.pathname.includes("admin") ? (
        <RecoilRoot>
          <ApolloSetting>
            <Global styles={AdminGlobalStyles} />
            {isShowAdminNavigation && <AdminNavigation />}
            <Component {...pageProps} />
          </ApolloSetting>
        </RecoilRoot>
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
