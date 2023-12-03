export default function GoogleIcon({ type, onClick, variant, tabIndex }) {
  return (
    <span tabIndex={tabIndex ? "0" : undefined} onClick={onClick} className={`material-symbols-outlined ${variant}`}>
      {type}
    </span>
  );
}
