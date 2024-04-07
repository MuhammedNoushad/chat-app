import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start a conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
