import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function Footer() {
  const { user } = useContext(UserContext);
  return (
    <footer>
      {user && <Link to="/contact">having trouble? contact us</Link>}
    </footer>
  );
}
