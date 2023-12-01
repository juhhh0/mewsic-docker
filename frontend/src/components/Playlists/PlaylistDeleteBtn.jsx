import { useState } from "react";
import axios from "axios"
import Button from "../Button/Button";

export default function PlaylistDeleteBtn({playlist, user}) {
    console.log(playlist, "hahghj")
    const [sure, setSure] = useState(false)
    const handleDelete = () => {
        if (!user) {
            return;
          }
          axios
            .delete(`${import.meta.env.VITE_URL}/api/playlists/${playlist._id}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then(window.location = "/")
            
    }

    return (
        <Button
        onClick={(event) => {
          event.stopPropagation();
          if (sure) {
            handleDelete();
          } else {
            setSure(true);
          }
        }}
        label={sure ? "Sure delete" : "Delete Playlist"}
        variant="delete_playlist"
      />
    )
}