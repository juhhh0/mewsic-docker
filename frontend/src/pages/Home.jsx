import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.jsx";
import { PlayerContext } from "../contexts/playerContext.jsx";
import UploadForm from "../components/UploadForm";
import { fetch_get } from "../utils/utils";
import TrackList from "../components/TrackList";
import UserList from "../components/UserList.jsx";
import Playlists from "../components/Playlists/Playlists.jsx";
import Button from "../components/Button/Button.jsx";
import TopTrackList from "../components/TopTrackList.jsx";

function Home() {
  const [playlist, setPlaylist] = useState({});
  const [userPlaylists, setUserPlaylists] = useState({})
  const [users, setUsers] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState()
  const { state, setState } = useContext(PlayerContext);
  const { user } = useContext(UserContext);

  const backToAll = () => {
    setState({ type: "all", query: "" });
  };

  useEffect(() => {
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
      if (state.type == "playlist") {
        const data = await fetch_get(`playlists/${state.query}`, user);
        setPlaylist(data.tracks);
        setCurrentPlaylist(data.playlist)
        setUsers({});
      }
      const data = await fetch_get(`playlists`, user)
      setUserPlaylists(data)
    };

    fetch();
  }, [state]);

  return (
    <>
      {state.type != "all" ? (
        <span className="back_button" onClick={backToAll}>
          ← All
        </span>
      ) : <Playlists/>}
     
      <section
        className={`container ${state.type == "upload" && "flex-column"}`}
      >
        <TopTrackList playlist={currentPlaylist} user={user} state={state}/>
        {state.type == "search" && <UserList users={users} />}
        {state.type != "upload" && playlist?.length > 0 && (
          <TrackList playlist={playlist} user_playlists={userPlaylists} />
        )}
        {(state.type != "upload") && playlist?.length == 0 && (
          <>
          <h3 style={{textAlign: "center", padding: "10px"}}>{state.type == "search" ? "No Results for your search" : "it's empty there, upload your first track"}</h3>
          {state.type != "search" && <Button variant={"center"} label={"Upload"} onClick={() => {setState({type: "upload", query: ""})}}/>}
          </>
        )}
        {state.type == "upload" && <UploadForm />}
      </section>
    </>
  );
}

export default Home;
