import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  user: null,
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  // console.log("user context: ", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
