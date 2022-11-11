import { atom } from "recoil";

export const AdminsignUpInputState = atom({
  key: "AdminsignUpInputState",
  default: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
});
