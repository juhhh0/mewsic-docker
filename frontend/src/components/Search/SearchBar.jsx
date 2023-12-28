import { useContext } from "react";
import { PlayerContext } from "../../contexts/playerContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { setState } = useContext(PlayerContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = async (e) => {
    if (location.pathname != "/") {
      navigate("/");
    }

    if (e.target.value.length > 1) {
      setState({
        type: "search",
        query: e.target.value,
      });
    } else {
      setState({
        type: "all",
        query: "",
      });
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for yours tracks"
      className="search_bar"
      onChange={handleChange}
    />
  );
}
