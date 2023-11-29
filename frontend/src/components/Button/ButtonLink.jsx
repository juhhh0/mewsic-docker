import { Link } from "react-router-dom";
import "./Button.css";

export default function ButtonLink({ label, href, variant }) {
  return (
    <Link to={href} className={`btn ${variant}`}>
      {label}
    </Link>
  );
}
