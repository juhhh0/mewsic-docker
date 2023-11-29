import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.jsx";
import { fetch_get } from "../utils/utils";
import AdminTable from "../components/AdminTable/AdminTable";
import { PlayerContext } from "../contexts/playerContext.jsx";

export default function Admin() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const { state, setState } = useContext(PlayerContext);

  if (user.admin == 0) {
    return (window.location.href = "/");
  }

  useEffect(() => {
    if (state.type == "upload") {
      setState({ type: "all", query: "" });
    }

    const fetch = async () => {
      const data = await fetch_get("admin", user);
      setData(data);
    };
    fetch();
  }, []);

  return (
    <section className="container">
      <h2>Admin</h2>
      {data.users && <AdminTable data={data.users} type={"users"} />}
      {data.tracks && <AdminTable data={data.tracks} type={"tracks"} />}
      {data.albums && <AdminTable data={data.albums} type={"albums"} />}
      {data.artists && <AdminTable data={data.artists} type={"artists"} />}
      {data.users_tracks && (
        <AdminTable data={data.users_tracks} type={"users_tracks"} />
      )}
    </section>
  );
}
