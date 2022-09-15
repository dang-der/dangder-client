import { atom } from "recoil";

export const authModalVisibleState = atom<boolean>({
  key: "authModalState",
  default: false,
});
