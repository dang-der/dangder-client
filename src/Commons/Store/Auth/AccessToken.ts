import { GraphQLClient } from "graphql-request";
import { atom, selector } from "recoil";
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

export const loggedInUserLoadable = selector({
  key: "loggedInUserLoadable",
  get: async ({ get }) => {
    const token = get(accessTokenState);
    if (!token) {
      console.log("loggedInUserLoadableError", "token없음");
      return;
    }

    const client = new GraphQLClient("https://recipemaker.shop/graphql", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });

    try {
      const result = await client.request<Pick<IQuery, "fetchLoginUser">>(
        FETCH_LOGIN_USER
      );

      return result.fetchLoginUser;
    } catch (e) {
      console.log("fetchLoginUserError", e);
      return;
    }
  },
});
