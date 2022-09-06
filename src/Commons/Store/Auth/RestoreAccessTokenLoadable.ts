import { selector } from "recoil";
import { getAccessToken } from "../../Library/getAccessToken";



export const restoreAccessTokenLoadable = selector({
    key: "restoreAccessTokenLoadable",
    get: async () => {
      const newAccessToken = await getAccessToken();
      return newAccessToken;
    },
  });