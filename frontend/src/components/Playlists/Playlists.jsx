import { useContext, useRef } from "react";
import GoogleIcon from "../GoogleIcon";
import "./Playlists.css";
import { UserContext } from "../../contexts/userContext";
import { PlayerContext } from "../../contexts/playerContext";
import { AppContext } from "../../contexts/appContext";
import { useState } from "react";

export default function Playlists(){
    const {setState} = useContext(PlayerContext)
    const {user} = useContext(UserContext)
    const input = useRef(null)
    const [error, setError] = useState("")

    const {userPlaylists, refetch} = useContext(AppContext)

    const handleNewPlaylist = async () => {

        const title = input.current.value

        const res = await fetch(
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
          const data = await res.json()

          console.log(data)

          if(res.ok){
            refetch()
          }else {
            setError(data.error)
          }
         
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
          {userPlaylists && userPlaylists.map((playlist, i) => (
          <li className="playlists_item" tabIndex={"0"} key={i} onClick={() => {
            setPlayer(event, playlist)
          }}>{playlist.title}<span className="playlists_span">{playlist.tracks.length} <GoogleIcon type="play_circle"/></span></li>
          ))}
          {userPlaylists.length == 0 && (
            <h3 style={{textAlign: "center", padding: "10px"}}>no playlist yet, let's add some!</h3>
          )}
        </ul>
        <div className="flex-end">
          <span className="playlist_new"><input ref={input} className="input transparent" placeholder="new playlist"/> <GoogleIcon type="add" onClick={handleNewPlaylist} /> </span>
          {error && <p className="error_msg">{error}</p>}
          </div>
       
      </section>
    )
}