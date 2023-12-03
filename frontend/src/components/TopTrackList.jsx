import { useState } from "react";
import Button from "./Button/Button";
import { fetch_delete } from "../utils/utils";
import GoogleIcon from "./GoogleIcon";
import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

export default function TopTrackList({ playlist, user, state }) {
  const [open, setOpen] = useState(false);
  const [sure, setSure] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");

  const { refetch } = useContext(AppContext);

  const [title, setTitle] = useState(state.query);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    await fetch_delete({
      endpoint: `playlists/${playlist._id}`,
      user: user,
    }).then((window.location = "/"));
  };

  const handleSubmit = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/playlists/${playlist._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ title: title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      setOpen(false);
      setEdit(false);
      refetch();
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <div className="top_track_list">
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="input transparent"
          id="playlist_title_input"
          disabled={!edit}
          placeholder={state.type == "all" ? "All" : state.query}
        />
        {state.type == "playlist" && (
          <div className="relative">
            <GoogleIcon
              type={open ? "close" : "more_vert"}
              onClick={() => {
                setOpen((prev) => !prev);
                if (open) {
                  setEdit(false);
                }
              }}
            />
            <ul className={`playlists_options_btns ${open ? "open" : ""}`}>
              <li>
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
              </li>
              <li>
                <Button
                  label={edit ? "Submit" : "Rename"}
                  icon={edit ? "check" : "edit"}
                  onClick={() => {
                    if (edit) {
                      handleSubmit();
                    } else {
                      setEdit(true);
                    }
                  }}
                />
              </li>
            </ul>

            {error && <p className="error_msg">{error}</p>}
          </div>
        )}
      </div>
    </>
  );
}
