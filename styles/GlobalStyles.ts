import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = css`
  html {
    min-width: 300px;
    width: 100%;
    height: 100%;
    font-size: 12px;
    @media (min-width: 577px) {
      font-size: 18px;
    }

    @media (min-width: 376px) {
      font-size: 15px;
    }
  }

  body {
    width: 100%;
    height: 100%;
    > div:first-child {
      width: 100%;
      height: 100%;
      background-color: #d9d9d9;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ol,
  ul {
    list-style: none;
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
