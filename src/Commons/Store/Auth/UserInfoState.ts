import { atom, selector } from "recoil";
import { IUser, IUserOutput } from "../../Types/Generated/types";
import { accessTokenState } from "./AccessToken";

export const userInfoState = atom<IUserOutput | undefined>({
  key: "userInfoState",
  default: undefined,
});
