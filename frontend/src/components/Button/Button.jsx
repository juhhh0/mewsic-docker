import GoogleIcon from "../GoogleIcon";
import "./Button.css";

export default function Button({
  disabled,
  loading,
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
      {loading && <GoogleIcon type={"progress_activity"} variant={"spinning"}/>}
    </button>
  );
}
