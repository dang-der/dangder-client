import { withAuth } from "../../src/Commons/Library/WithAuth";
import ChatListContainer from "../../src/Components/Units/Chat/ChatRoomList.container";

function ChatPage() {
  return <ChatListContainer />;
}

export default withAuth(ChatPage);
