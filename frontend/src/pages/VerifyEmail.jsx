import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import ButtonLink from "../components/Button/ButtonLink";
import { fetch_get } from "../utils/utils";

const baseUrl = `http://${import.meta.env.VITE_URL}:3000/api/users`;

function VerifyEmail() {
  const location = useLocation();
  const [invalidUser, setInvalidUser] = useState("");
  const [busy, setBusy] = useState(true);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { token, id } = queryString.parse(location.search);

  const verifyToken = async () => {
    setError("");
    setSucces(false);
    setBusy(true);
    const data = await fetch_get(`users/verify?token=${token}&id=${id}`)
    if (!data.succes) {
      setBusy(false);
      setError(data.error);
      return setInvalidUser(data.error);
    }

    setSucces(true);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (succes) {
    return (
      <div className="container flex">
        <h2>Account verified</h2>
        <ButtonLink href="/login" variant="black" label="Login"/>
      </div>
    );
  }

  if (invalidUser) {
    return (
      <div className="container flex">
        <h2>{error}</h2>
      </div>
    );
  }

  if (busy) {
    return (
      <div className="container flex">
        <h2>Verifying account</h2>
      </div>
    );
  }
}
export default VerifyEmail;
