import { useState } from "react";
import Button from "../Button/Button";
import { fetch_delete } from "../../utils/utils";

export default function PlaylistDeleteBtn({playlist, user}) {
    const [sure, setSure] = useState(false)
    const handleDelete = async () => {
        if (!user) {
            return;
          }
          await fetch_delete({endpoint: `playlists/${playlist._id}`, user: user})
          window.location = "/"
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