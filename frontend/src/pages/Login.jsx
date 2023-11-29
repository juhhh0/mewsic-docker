import { useState } from "react";
import { Link } from "react-router-dom";
import { UserLogin } from "../utils/hooks/userLogin";
import Button from "../components/Button/Button";

function Login() {
  const [formData, setFormData] = useState("");
  const { login, error, message, isLoading } = UserLogin();


  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    await login(email, password);
  };
  return (
    <form
      className="container flex-column bg-grey"
      onSubmit={handleSubmit}
    >
      <h3>Login</h3>
      <input
        type="text"
        placeholder="email"
        onChange={handleOnChange}
        name="email"
        className="input"
      />
      <input
        type="password"
        placeholder="password"
        onChange={handleOnChange}
        name="password"
        className="input"
      />
      <Button type="submit" disabled={isLoading} onClick={handleSubmit} variant={isLoading && "disabled"} label="Login" />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "red" }}>{message}</p>}

      <Link to="/forgot-password">forgot password</Link>
      <Link to="/signup">no account? signup</Link>
    </form>
  );
}

export default Login;
