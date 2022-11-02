import { atom } from "recoil";
import { IChatRoom, IChatRoomsOutput } from "../../Types/Generated/types";
import { persistAtom } from "../persist";

export const enteredChatRoomInfoState = atom<
  IChatRoomsOutput | undefined | IChatRoom
>({
  key: "enteredChatRoomInfoState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const selectedInterestGroupChatState = atom<string>({
  key: "selectedInterestGroupChatState",
  default: "",
});
