import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import { apiRequest } from "../../Utils/api";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const data = await apiRequest(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
