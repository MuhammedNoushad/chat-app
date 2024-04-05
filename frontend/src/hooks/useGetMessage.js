import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useConversation from "../zustand/useConversation.js";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    setLoading(true);
    const getMessage = async () => {
      try {
        const res = await fetch(`/api/message/${selectedConversation?._id}`);
        const data = await res.json();

        setMessages(data);

        if (data.error) throw new Error(data.error);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessage();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
}

export default useGetMessage;
