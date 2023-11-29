import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.jsx";
import { PlayerContext } from "../contexts/playerContext.jsx";
import UploadForm from "../components/UploadForm";
import { fetch_get } from "../utils/utils";
import TrackList from "../components/TrackList";
import UserList from "../components/UserList.jsx";
import Playlists from "../components/Playlists/Playlists.jsx";

function Home() {
  const [playlist, setPlaylist] = useState({});
  const [users, setUsers] = useState({});
  const { state, setState } = useContext(PlayerContext);
  const { user } = useContext(UserContext);

  const backToAll = () => {
    setState({ type: "all", query: "" });
  };

  useEffect(() => {
    console.log(state)
    const fetch = async () => {
      if (state.type == "all") {
        const data = await fetch_get(`tracks`, user);
        setPlaylist(data);
        setUsers({});
      }
      if (state.type == "artist") {
        const data = await fetch_get(`tracks/artist/${state.query}`, user);
        setPlaylist(data);
        setUsers({});
      }
      if (state.type == "album") {
        const data = await fetch_get(`tracks/album/${state.query}`, user);
        setPlaylist(data);
        setUsers({});
      }
      if (state.type == "search") {
        const data = await fetch_get(`search/${state.query}`, user);
        setPlaylist(data.tracks);
        setUsers(data.users);
      }
    };

    fetch();
  }, [state]);

  console.log(users);

  return (
    <>
      {state.type != "all" && (
        <span className="back_button" onClick={backToAll}>
          ← All
        </span>
      )}
      <Playlists/>
      <section
        className={`container ${state.type == "upload" && "flex-column"}`}
      >
        <h2>{state.type == "all" ? "All" : state.query}</h2>
        {state.type == "search" && <UserList users={users} />}
        {state.type != "upload" && playlist?.length > 0 && (
          <TrackList playlist={playlist} />
        )}
        {state.type == "upload" && <UploadForm />}
      </section>
    </>
  );
}

export default Home;
