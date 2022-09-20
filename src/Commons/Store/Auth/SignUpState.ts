import { atom } from "recoil";

export const signUpInputState = atom({
  key: "signUpInputState",
  default: {
    email: "",
    password: "",
    passwordCheck: "",
    authenticationCode: Array(4).fill(0),
    isActiveButton: false,
  },
});

export const verifyErrorState = atom({
  key: "verifyErrorState",
  default: "",
});

export interface IRegNumInputState {
  registerNumber: string;
  ownerBirthYear: number;
  ownerBirthMonth: number;
  ownerBirthDay: number;
}
export const regNumInputState = atom<IRegNumInputState>({
  key: "regNumInputState",
  default: {
    registerNumber: "",
    ownerBirthYear: 0,
    ownerBirthDay: 0,
    ownerBirthMonth: 0,
  },
});

export interface IDogProfile {
  [key: string]: any;
  imageUrls: string[];
  imageFiles: File[];
  age: number;
  introduce: string;
  characters: string[];
  interests: string[];
  avoid: any;
}
export const dogInfoInputState = atom<IDogProfile>({
  key: "dogInfoInputState",
  default: {
    imageUrls: [],
    imageFiles: [],
    age: 0,
    introduce: "",
    characters: [],
    interests: [],
    avoid: [],
  },
});


