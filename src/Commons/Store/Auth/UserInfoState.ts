import { atom } from "recoil";
import { IUser } from "../../Types/Generated/types";

export const userInfoState = atom<IUser | undefined>({
  key: "userInfoState",
  default: undefined,
});