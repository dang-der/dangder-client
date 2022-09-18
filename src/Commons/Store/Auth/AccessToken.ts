import { atom, selector } from "recoil";
import { getAccessToken } from "../../Library/getAccessToken";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async ({}) => {
    const newAccessToken = await getAccessToken();
    console.log("newAccessToken", newAccessToken);

    return newAccessToken;
  },

  set: ({ set }, newToken) => set(accessTokenState, newToken),
});
