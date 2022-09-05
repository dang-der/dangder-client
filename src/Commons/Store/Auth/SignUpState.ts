import { atom } from "recoil";

export const signUpInputState = atom({
  key: "signUpInputState",
  default: {
    email: "",
    password: "",
    authenticationCode: Array(4).fill(0),
    isActiveButton: false,
  },
});
