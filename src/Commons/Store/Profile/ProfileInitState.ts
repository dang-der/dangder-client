import { atom } from "recoil";

export const profileInputState = atom({
  key: "profileInputState",
  default: {
    registerNumber: "",
    docOwnerBirth: "",
    createDogInput: {
      age,
    },
  },
});
