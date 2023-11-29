import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import { fetch_post } from "../utils/utils";

function Forgot() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const data = await fetch_post({endpoint: "users/forgot-password", params: {email: email}})

    if (!data.succes) {
      return setError(data.error);
    }

    setMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="container flex-column bg-grey">
      <h3>Forgot password</h3>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        className="input"
      />
      <Button onClick={handleSubmit} label="Ask a new password" />
      <button type="submit" style={{ display: "none" }}></button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <Link to="/login">Log in </Link>
      <Link to="/signup">no account? signup</Link>
    </form>
  );
}

export default Forgot;
