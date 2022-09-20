import { atom } from "recoil";

export interface IDogProfile {
  [key: string]: any;
  imageUrls: string[];
  imageFiles: File[];
  dogBirthYear: number;
  dogBirthMonth: number;
  dogBirthDay: number;
  isUnknownDogBirth: boolean;
  introduce: string;
  characters: string[];
  interests: string[];
  avoid: any;
}

export interface IProfileInputState {
  registerNumber: string;
  ownerBirthYear: number;
  ownerBirthMonth: number;
  ownerBirthDay: number;
  dogInput: IDogProfile;
}
export const profileEditState = atom<IProfileInputState>({
  key: "profileEditState",
  default: {
    registerNumber: "",
    ownerBirthYear: 0,
    ownerBirthMonth: 0,
    ownerBirthDay: 0,
    dogInput: {
      imageUrls: [],
      imageFiles: [],
      dogBirthYear: 0,
      dogBirthMonth: 0,
      dogBirthDay: 0,
      isUnknownDogBirth: false,
      introduce: "",
      characters: [],
      interests: [],
      avoid: [],
    },
  },
});
