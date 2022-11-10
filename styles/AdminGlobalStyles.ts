import { css } from "@emotion/react";

export const AdminGlobalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "InfinitySans";
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    cursor: default;
    position: relative;
  }

  h1 h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    line-height: 1.5;
    vertical-align: top;
    letter-spacing: -0.5%;
  }

  button {
    border: none;
  }

  a {
    text-decoration: none;
    color: #000;
    :hover {
      color: inherit;
    }
  }

  li {
    list-style: none;
  }
`;
