import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IChatRoomsOutput } from "../../Types/Generated/types";

const { persistAtom } = recoilPersist();

export const enteredChatRoomInfoState = atom<IChatRoomsOutput | undefined>({
  key: "enteredChatRoomInfoState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
