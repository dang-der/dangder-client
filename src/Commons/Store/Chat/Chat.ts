import { atom } from "recoil";
import { IChatRoom, IDog } from "../../Types/Generated/types";

interface IChatRoomInfo {
  roomInfo: IChatRoom;
  pairInfo: IDog;
}
export const enteredChatRoomInfoState = atom<IChatRoomInfo | undefined>({
  key: "enteredChatRoomInfoState",
  default: undefined,
});
