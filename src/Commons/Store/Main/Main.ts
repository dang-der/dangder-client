import { atom } from "recoil";

// export interface IDog {
//   name: string;
//   age: number;
//   description: string;
//   img: string[];
// }

export const aroundDogsState = atom<any>({
  key: "aroundDogsState",
  default: {
    name: "",
    age: 1,
    description: "",
    img: [],
  },
});
