import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { apiRequest } from "../../Utils/api";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
