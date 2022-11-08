import { atom } from "recoil";


export interface IDogProfile {
  [key: string]: any;
  imageUrls: string[];
  imageFiles: File[];
  age: number;
  introduce: string;
  characters: string[];
  interests: string[];
}

export const dogProfileEditState = atom<IDogProfile>({
  key: "profileEditState",
  default: {
    imageUrls: [],
    imageFiles: [],
    age: 0,
    introduce: "",
    characters: [],
    interests: [],
  },
});
