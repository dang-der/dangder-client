import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = css`
  body {
    width: 100%;
    height: 100%;
    > div {
      width: 100%;
      height: 100%;
      background-color: #d9d9d9;
    }
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: ${process.browser &&
    ((window.innerHeight * window.innerWidth) / 370944) * 16 + "px"};
  }

  applet,
  object,
  iframe,
  blockquote,
  pre,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  ins,
  kbd,
  q,
  samp,
  small,
  strike,
  sub,
  sup,
  tt,
  var,
  center,
  dl,
  dt,
  dd,
  fieldset,
  form,
  label,
  legend,
  table,
  caption article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const Wrapper = styled.div`
  max-width: 576px;
  margin: 0 auto;
  background-color: white;
  height: 100%;
`;
