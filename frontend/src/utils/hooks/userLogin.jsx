import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext.jsx";
import { fetch_post } from "../utils.js";

export const UserLogin = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setUser } = useContext(UserContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const data = await fetch_post({endpoint: "users/login", params: {email, password}})


    if (!data.succes) {
      setIsLoading(false);
      setError(data.error);
      setMessage(data.message);
    }

    if (data.succes) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, message };
};
