import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IChatRoom, IChatRoomsOutput } from "../../Types/Generated/types";

export const { persistAtom } = recoilPersist();

export const enteredChatRoomInfoState = atom<
  IChatRoomsOutput | undefined | IChatRoom
>({
  key: "enteredChatRoomInfoState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
