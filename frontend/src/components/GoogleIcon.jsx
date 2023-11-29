export default function GoogleIcon({ type, onClick, variant }) {
  return (
    <span onClick={onClick} className={`material-symbols-outlined ${variant}`}>
      {type}
    </span>
  );
}
