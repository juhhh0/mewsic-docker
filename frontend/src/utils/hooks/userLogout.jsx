import { useContext } from "react";
import { UserContext } from "../../contexts/userContext.jsx";

export const UserLogout = () => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { logout };
};
