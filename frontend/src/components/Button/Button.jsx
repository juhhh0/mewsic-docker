import GoogleIcon from "../GoogleIcon";
import "./Button.css";

export default function Button({
  disabled,
  type,
  label,
  onClick,
  variant,
  icon,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`btn ${variant || ""} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      {label}
      {icon && <GoogleIcon type={icon} />}
    </button>
  );
}
