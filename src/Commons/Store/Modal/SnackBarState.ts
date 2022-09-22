import { atom } from "recoil";

interface ISnackBarState {
  type?: string;
  visible: boolean;
  message: string;
}
export const snackBarState = atom<ISnackBarState>({
  key: "snackBarState",
  default: {
    type: "success",
    visible: false,
    message: "",
  },
});
