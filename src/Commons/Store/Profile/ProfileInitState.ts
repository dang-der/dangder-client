import { atom } from "recoil";


// todo : 나중에 타입 지정할 것 
export const profileInputState = atom<any>({
  key: "profileInputState",
  default: {
    registerNumber: "",
    ownerBirthYear: 0,
    ownerBirthMonth: 0,
    ownerBirthDay: 0,
    createDogInput: {},
  },
});
