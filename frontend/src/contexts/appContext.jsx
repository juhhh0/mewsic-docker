import { createContext, useContext, useEffect, useState } from "react";
import { fetch_get } from "../utils/utils";
import { UserContext } from "./userContext";

export const AppContext = createContext({
    userPlaylists: null
});

export const AppContextProvider = ({ children }) => {
  const [userPlaylists, setUserPlaylists] = useState([]);

  const { user } = useContext(UserContext)

  const refetch = async () => {
    const data = await fetch_get(`playlists`, user);
    setUserPlaylists(data)
  }

  useEffect(() => {
    const fetch = async () => {
            const data = await fetch_get(`playlists`, user);
            setUserPlaylists(data)
        
    }
    fetch()
  }, [user])

  return (
    <AppContext.Provider
      value={{
        userPlaylists,
        setUserPlaylists,
        refetch
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
