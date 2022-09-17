import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = css`
  html {
    min-width: 300px;
    width: 100%;
    height: 100%;
    font-size: 15px;
    @media (min-width: 550px) {
      font-size: 18px;
    }
    @media (max-width: 376px) {
      font-size: 12px;
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

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const Wrapper = styled.div`
  max-width: 576px;
  margin: 0 auto;
  background-color: white;
  height: 100%;
`;

export const MainColor = "#304FFE";
export const SubColor = "#FDC500";
export const GrayF5 = "#F5F5F5";
export const Gray76 = "#767676";
export const GrayD9 = "#D9D9D9";