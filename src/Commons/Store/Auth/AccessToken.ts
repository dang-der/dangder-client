import { GraphQLClient } from "graphql-request";
import { atom, selector } from "recoil";
import { io } from "socket.io-client";
import { FETCH_LOGIN_USER } from "../../../Components/Units/Auth/Login/Login.queries";
import { getAccessToken } from "../../Library/getAccessToken";
import { IQuery } from "../../Types/Generated/types";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async ({ get }) => {
    const newAccessToken = await getAccessToken();
    console.log("newAccessToken", newAccessToken);

    return newAccessToken;
  },

  set: ({ set }, newToken) => set(accessTokenState, newToken),
});




   