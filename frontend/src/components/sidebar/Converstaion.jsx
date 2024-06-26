import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js";

function Converstaion({ conversation, emoji, lastIndex }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUser } = useSocketContext();

  const isOnline = onlineUser.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center p-2 py-1 hover:bg-sky-500 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => {
          setSelectedConversation(conversation);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl ">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider py-0 my-0 h-1" />}
    </>
  );
}

export default Converstaion;
