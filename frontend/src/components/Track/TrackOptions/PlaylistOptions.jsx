import { useContext, useEffect } from "react";
import { fetch_post } from "../../../utils/utils";
import Button from "../../Button/Button";
import GoogleIcon from "../../GoogleIcon";
import { UserContext } from "../../../contexts/userContext";

export default function PlaylistOptions({user_playlists, track}) {

    const {user} = useContext(UserContext)

    const handleClick = async (id) => {
        await fetch(
            `${import.meta.env.VITE_URL}/api/playlists/track`,
            {
              method: "POST",
              body: JSON.stringify({track: track, playlist: id}),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
    }

    return(
        <li>
                <ul className="playlists_options_dropdown">
                    { user_playlists.length && user_playlists.map((item, index) => (
                        <li onClick={(event) => {
                            event.stopPropagation();
                            handleClick(item._id)
                        }} key={index}><p>{item.title}</p><GoogleIcon type="add" /></li>
                    ))}
                </ul>
        
            <Button label="Add to playlist" variant="option" icon="add" />
        </li>
    )
}