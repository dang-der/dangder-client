import { io } from "socket.io-client";

export const socket = io("https://recipemaker.shop/dangderchats", {
  forceNew: true,
  transports: ["websocket"],
  reconnectionDelayMax: 2 * 60 * 1000,
});
