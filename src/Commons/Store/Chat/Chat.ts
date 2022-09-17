import { atom } from "recoil";
import { IChatRoomsOutput } from "../../Types/Generated/types";

export const enteredChatRoomInfoState = atom<IChatRoomsOutput | undefined>({
  key: "enteredChatRoomInfoState",
  default: undefined,
});
