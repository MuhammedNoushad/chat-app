import useGetConversations from "../../hooks/useGetConversations.js";
import Converstaion from "./Converstaion";
import { getRandomEmoji } from "../../utils/emoji.js";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => {
        return (
          <Converstaion
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIndex={index === conversation.length - 1}
          />
        );
      })}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}

export default Conversations;
