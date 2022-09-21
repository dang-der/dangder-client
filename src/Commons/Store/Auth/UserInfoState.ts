import { atom } from "recoil";
import { IUserOutput } from "../../Types/Generated/types";
import { persistAtom } from "../Chat/Chat";

export const userInfoState = atom<IUserOutput | undefined>({
  key: "userInfoState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
