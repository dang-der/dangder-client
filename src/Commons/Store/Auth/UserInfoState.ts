import { atom, selector } from "recoil";
import { IUser } from "../../Types/Generated/types";
import { accessTokenState } from "./AccessToken";

export const userInfoState = atom<IUser | undefined>({
  key: "userInfoState",
  default: undefined,
});
