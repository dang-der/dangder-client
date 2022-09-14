import { atom } from "recoil";

export const authModalVisibleState = atom<boolean>({
  key: "authModalState",
  default: false,
});

export const nonmemberModalVisible = atom<boolean>({
  key: "nonmemberModalVisible",
  default: false,
});
