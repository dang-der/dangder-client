import { atom } from "recoil";

export interface IReviewInput {
  details: string[];
  message: string;
}
export const reviewInputState = atom<IReviewInput>({
  key: "reviewInputState",
  default: {
    details: [],
    message: "",
  },
});
