import { atom } from "recoil";
import { IAdminUser } from "../../Types/Generated/types";
import { persistAtom } from "../persist";

export const adminInfoState = atom<IAdminUser | undefined>({
  key: "adminInfoState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
