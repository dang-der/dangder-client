import { atom } from "recoil";
import {  IUserOutput } from "../../Types/Generated/types";


export const userInfoState = atom<IUserOutput | undefined>({
  key: "userInfoState",
  default: undefined,
});
