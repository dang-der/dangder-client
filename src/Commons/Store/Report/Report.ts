import { atom } from "recoil";

export const reportContentsState = atom<string>({
  key: "reportContentsState",
  default: "",
});
