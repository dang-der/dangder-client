import { AlertColor } from "@mui/material";
import { atom } from "recoil";

interface ISnackBarState {
  type?: AlertColor;
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
