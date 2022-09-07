import { atom } from "recoil";


export const userInfoState = atom({
    key: "userInfoState",
    default: {
      email: "",
      name: "",
    },
  });