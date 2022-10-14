import { atom } from "recoil";
import { ICharacter, IInterest } from "../../Types/Generated/types";

export interface IDogProfile {
  [key: string]: any;
  imageUrls: string[];
  imageFiles: File[];
  age: number;
  introduce: string;
  characters: ICharacter[];
  interests: IInterest[];
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
