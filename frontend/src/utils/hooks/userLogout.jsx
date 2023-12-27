import { useContext } from "react";
import { UserContext } from "../../contexts/userContext.jsx";
import { PlayerContext } from "../../contexts/playerContext.jsx";

export const UserLogout = () => {
  const { setUser } = useContext(UserContext);
  const { setPlaylist } = useContext(PlayerContext)

  const logout = () => {
    setPlaylist([])
    localStorage.removeItem("user");
    setUser(null);
  };

  return { logout };
};
