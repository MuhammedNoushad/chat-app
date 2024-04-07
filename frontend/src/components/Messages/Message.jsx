import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extract.js";
import useConversation from "../../zustand/useConversation.js";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = authUser._id === message.senderId;
  const extractedTime = extractTime(message.createdAt);
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  const shakeClassname = message.shouldShake ? "shake" : "";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassname} `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClassname} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-sm flex gap-1 items-center text-white">
        {extractedTime}
      </div>
    </div>
  );
}

export default Message;
