import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import ButtonLink from "../components/Button/ButtonLink";
import Button from "../components/Button/Button";
import { fetch_get, fetch_post } from "../utils/utils";

const baseUrl = `https://${import.meta.env.VITE_URL}:3001/api/users`;

function Reset() {
  const location = useLocation();
  const navigate = useNavigate();
  const [invalidUser, setInvalidUser] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token, id } = queryString.parse(location.search);

  const verifyToken = async () => {
    try {
      const data = await fetch_get(`users/verify-token?token=${token}&id=${id}`)
    
      if (!data.succes) {
        return setInvalidUser(data.error);
      }
      setBusy(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = newPassword;

    if (password.trim().length < 8 || password.trim().length > 20) {
      return setError("Password must be 8 to 20 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords must be the same");
    }

    try {
      setBusy(true);
      const data = await fetch_post({endpoint: `users/reset-password?token=${token}&id=${id}`, params: password})
      setBusy(false);

      if (data.succes) {
        setSucces(true);
        navigate("/reset-password", { replace: true });
      }
    } catch (error) {
      setBusy(false);
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.succes) return setError(data.error);
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  if (succes) {
    return (
      <div className="container flex-column">
        <h2>Password reset succesfully</h2>
        <ButtonLink variant="black" label="Login" href="/login" />
      </div>
    );
  }

  if (invalidUser) {
    return (
      <div className="container flex-column">
        <h2>Reset token not found</h2>
      </div>
    );
  }

  if (busy) {
    return (
      <div className="container flex-column">
        <h2>Verifying token</h2>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="container flex-column bg-grey">
        <input
          name="password"
          onChange={handleOnChange}
          type="password"
          placeholder="new password"
          className="input"
        />
        <input
          name="confirmPassword"
          onChange={handleOnChange}
          type="password"
          placeholder="confirm new password"
          className="input"
        />

        <Button
          type="submit"
          variant="black"
          onClick={handleSubmit}
          label="Reset password"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Reset;
