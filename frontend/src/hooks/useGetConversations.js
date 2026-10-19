import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "../../Utils/api";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/api/users");
        setConversations(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load conversations."
        );
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
