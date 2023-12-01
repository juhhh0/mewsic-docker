import { useContext, useEffect, useRef } from "react";
import GoogleIcon from "../GoogleIcon";
import "./Playlists.css";
import { UserContext } from "../../contexts/userContext";
import { fetch_get } from "../../utils/utils";
import { PlayerContext } from "../../contexts/playerContext";
import { AppContext } from "../../contexts/appContext";

export default function Playlists(){
    const {setState} = useContext(PlayerContext)
    const {user} = useContext(UserContext)
    const input = useRef(null)

    const {userPlaylists, refetch} = useContext(AppContext)

    const handleNewPlaylist = async () => {

        const title = input.current.value

        await fetch(
            `${import.meta.env.VITE_URL}/api/playlists/new`,
            {
              method: "POST",
              body: JSON.stringify({title: title}),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );     
          refetch()
         
    }

    const setPlayer = (event, playlist) => {
      event.stopPropagation();
      window.scrollTo(top);
      setState({
        type: "playlist",
        query: playlist.title,
      });
    }



    return (
        <section className="container playlists">
        <h2>Playlists</h2>
        <ul className="playlists_list">
          {userPlaylists && userPlaylists.map((playlist) => (
          <li className="playlists_item" onClick={() => {
            setPlayer(event, playlist)
          }}>{playlist.title}<span className="playlists_span">{playlist.tracks.length} <GoogleIcon type="play_circle"/></span></li>
          ))}
        </ul>
        <div className="flex-end"><span className="playlist_new"><input ref={input} className="input transparent" placeholder="new playlist"/> <GoogleIcon type="add" onClick={handleNewPlaylist} /> </span></div>
      </section>
    )
}