import { AppProps } from "next/app";
import {Global} from "@emotion/react"
import {globalStyles} from "../styles/GlobalStyles"


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
  <Global styles={globalStyles}/>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp;
