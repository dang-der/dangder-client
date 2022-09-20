import { atom } from "recoil";


export interface IDogProfile {
  [key: string]: any;
  imageUrls: string[];
  imageFiles: File[];
  age: number;
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
export const profileInputState = atom<IProfileInputState>({
  key: "profileInputState",
  default: {
    registerNumber: "",
    ownerBirthYear: 0,
    ownerBirthMonth: 0,
    ownerBirthDay: 0,
    dogInput: {
      imageUrls: [],
      imageFiles: [],
      age: 0,
      isUnknownDogBirth: false,
      introduce: "",
      characters: [],
      interests: [],
      avoid: [],
    },
  },
});

