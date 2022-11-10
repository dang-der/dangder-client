import { atom, selector } from "recoil";
import { getAdminAccessToken } from "../../Library/getAdminAccessToken";
import { adminInfoState } from "./AdminInfoState";

export const adminAccessTokenState = atom({
  key: "adminAccessTokenState",
  default: "",
});

export const restoreAdminAccessToken = selector({
  key: "restoreAdminAccessToken",
  get: async ({ get }) => {
    if (!get(adminInfoState)) return;
    const newAdminAccessToken = await getAdminAccessToken();

    return newAdminAccessToken;
  },

  set: ({ set }, newAdminToken) => set(adminAccessTokenState, newAdminToken),
});
