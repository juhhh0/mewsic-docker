import { useContext, useEffect, useState } from "react";
import { fetch_post } from "../../../utils/utils";
import Button from "../../Button/Button";
import GoogleIcon from "../../GoogleIcon";
import { UserContext } from "../../../contexts/userContext";
import { AppContext } from "../../../contexts/appContext";

export default function PlaylistOptions({item, track}) {

    const {user} = useContext(UserContext)
    const {refetch} = useContext(AppContext)
    const [isAdded, setIsAdded] = useState(item.tracks.find(objet => objet._id === track) != undefined ? true : false)


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
        setIsAdded(prev => !prev)
        refetch()
    }
    

                        return (
                        <li onClick={(event) => {
                            event.stopPropagation();
                            handleClick(item._id, isAdded)
                        }}><p>{item.title}</p><GoogleIcon type={isAdded ? "remove" : "add"} /></li>
                    )
    
}