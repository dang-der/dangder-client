import { atom, selector } from "recoil";
import { getAccessToken } from "../../Library/getAccessToken";
import { persistAtom } from "../persist";
import { userInfoState } from "./UserInfoState";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async ({ get }) => {
    if (!get(userInfoState)) return;
    const newAccessToken = await getAccessToken();

    return newAccessToken;
  },

  set: ({ set }, newToken) => set(accessTokenState, newToken),
});

export const visitedState = atom({
  key: "visitedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
