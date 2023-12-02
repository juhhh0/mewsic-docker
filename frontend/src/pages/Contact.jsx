import { useContext, useState } from "react";
import Button from "../components/Button/Button";
import { UserContext } from "../contexts/userContext";

export default function Contact() {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const { user } = useContext(UserContext);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setError("");
    setMessage("");

    let form = new FormData();
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/admin/contact`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();

    if (!data.succes) {
      setIsLoading(false);
      return setError(data.error);
    }
    setSucces(true);
    setMessage(data.message);
    setIsLoading(false);
  };
  return (
    <form className="container flex-column bg-grey" action="">
      <h2>Contact Admin</h2>
      <p>If you have any troubles or question, feel free to ask !</p>
      <p>We will reply as soon as possible on your email.</p>
      <input
        type="text"
        name="subject"
        placeholder="subject"
        className="input contact"
        onChange={handleOnChange}
      />
      <textarea
        id=""
        cols="30"
        rows="10"
        name="message"
        className="input contact"
        placeholder="your message"
        onChange={handleOnChange}
      ></textarea>
      <Button
        type="submit"
        variant={isLoading && "disabled"}
        onClick={handleSubmit}
        disabled={isLoading || succes}
        label="Contact"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </form>
  );
}
