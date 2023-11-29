import { useContext, useEffect, useRef, useState } from "react";
import GoogleIcon from "../GoogleIcon";
import "./Playlists.css";
import { UserContext } from "../../contexts/userContext";
import { fetch_get } from "../../utils/utils";

export default function Playlists(){
    const [playlists, setPlaylists] = useState([])

    const {user} = useContext(UserContext)
    const input = useRef(null)

    const handleNewPlaylist = async () => {

        const title = input.current.value

        await fetch(
            `http://${import.meta.env.VITE_URL}:3001/api/playlists/new`,
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

    useEffect(() => {
      const fetch = async () => {
        const data = await fetch_get(`playlists`, user);
        setPlaylists(data)

      }
      fetch()
    }, [])
    return (
        <section className="container playlists">
        <h2>Playlists</h2>
        <ul className="playlists_list">
          {playlists && playlists.map((playlist) => (
          <li className="playlists_item">{playlist.title}<span className="playlists_span">3 <GoogleIcon type="play_circle"/></span></li>
          ))}
        </ul>
        <div className="flex-end"><span className="playlist_new"><input ref={input} className="input transparent" placeholder="new playlist"/> <GoogleIcon type="add" onClick={handleNewPlaylist} /> </span></div>
      </section>
    )
}