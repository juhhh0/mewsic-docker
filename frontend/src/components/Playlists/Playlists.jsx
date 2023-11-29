import { useContext, useRef } from "react";
import GoogleIcon from "../GoogleIcon";
import "./Playlists.css";
import { UserContext } from "../../contexts/userContext";

export default function Playlists(){

    const {user} = useContext(UserContext)
    const input = useRef(null)

    const handleNewPlaylist = async () => {

        const title = input.current.value

        await fetch(
            `http://${import.meta.env.VITE_URL}:5001/api/playlists/new`,
            {
              method: "POST",
              body: JSON.stringify({title: title}),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );         
    }
    return (
        <section className="container playlists">
        <h2>Playlists</h2>
        <ul className="playlists_list">
          <li className="playlists_item">titre playlist 1<span className="playlists_span">3 <GoogleIcon type="play_circle"/></span></li>
          <li className="playlists_item">titre playlist 2<span className="playlists_span">6 <GoogleIcon type="play_circle"/></span></li>
          <li className="playlists_item">titre playlist 3<span className="playlists_span">7 <GoogleIcon type="play_circle"/></span></li>
          <li className="playlists_item">titre playlist 3<span className="playlists_span">7 <GoogleIcon type="play_circle"/></span></li>
          <li className="playlists_item">titre playlist 3<span className="playlists_span">7 <GoogleIcon type="play_circle"/></span></li>
        </ul>
        <div className="flex-end"><span className="playlist_new"><input ref={input} className="input transparent" placeholder="new playlist"/> <GoogleIcon type="add" onClick={handleNewPlaylist} /> </span></div>
      </section>
    )
}