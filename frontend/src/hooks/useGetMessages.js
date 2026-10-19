import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import { apiRequest } from "../../Utils/api";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const data = await apiRequest(
          `/api/messages/${selectedConversation._id}`
        );
        setMessages(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Could not load messages."
        );
      } finally {
        setLoading(false);
      }
    };

    // Reset messages when chat changes to prevent showing old messages
    setMessages([]);

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);

  return { messages, loading };
};
export default useGetMessages;
