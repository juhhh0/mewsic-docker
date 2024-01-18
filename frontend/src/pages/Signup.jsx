import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import { fetch_post } from "../utils/utils";

function Signup() {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const cguCheckbox = useRef(null)

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!cguCheckbox.current.checked){
      setIsLoading(false);
      return setError("accept cgu");
    }

    setIsLoading(true);
    const { email, password, pseudo } = formData;

    setError("");
    setMessage("");

    const data = await fetch_post({
      endpoint: "users/signup",
      params: { email, password, pseudo },
    });

    if (!data.succes) {
      setIsLoading(false);
      return setError(data.error);
    }
    setSucces(true);
    setMessage(data.message);
    setIsLoading(false);
  };
  return (
    <form className="container flex-column bg-grey" onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <input
        type="text"
        placeholder="pseudo"
        onChange={handleOnChange}
        name="pseudo"
        className="input"
      />
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

      <div className="flex">
        <label htmlFor="cgu" className={error == "accept cgu flex" ? "cguerror" : "flex"} style={{gap: "3px"}}>I accept the <Link target="_blank" to={"/cgu"} style={{textDecoration: "underline"}}>Terms of Service</Link></label>
        <input className="cguInput" ref={cguCheckbox} type="checkbox" name="cgu"/>
      </div>

      <Button
        type="submit"
        variant={isLoading && "disabled"}
        onClick={handleSubmit}
        disabled={isLoading || succes}
        label="Sign up"
      />

      {error && <p className="error_msg">{error}</p>}
      {message && <p className="succes_msg">{message}</p>}

      <Link to="/login">already an account? login</Link>
    </form>
  );
}

export default Signup;
