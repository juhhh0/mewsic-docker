import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function Footer() {
  const { user } = useContext(UserContext);
  return (
    <footer className="flex">
      <Link to={"/cgu"}>Terms of service</Link>
      {user && (
        <>
      <span>-</span>
      <Link to="/contact">Having trouble? contact us</Link>
        </>)}
    </footer>
  );
}
