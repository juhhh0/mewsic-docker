import { useState, useRef, useContext } from "react";
import "./Track.css";
import { useEffect } from "react";
import { PlayerContext } from "../../contexts/playerContext.jsx";
import { UserContext } from "../../contexts/userContext.jsx";
import Button from "../Button/Button";
import { fetch_delete, fetch_get, fetch_post } from "../../utils/utils";
import PlaylistOptions from "./TrackOptions/PlaylistOptions.jsx";

function Track({ track, i, playlist, user_playlists }) {
  const [duration, setDuration] = useState(0);
  const audio = useRef(null);
  const [optOpen, setOptOpen] = useState(false);
  const [sure, setSure] = useState(false);
  const {
    playlist: play,
    setPlaylist,
    setCurrent,
    setState,
    current,
    playing,
    setPlaying,
  } = useContext(PlayerContext);

  const isPlaying = play[current]?._id == track._id;

  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    await fetch_delete({ endpoint: `tracks/${track._id}`, user: user });
    window.location.reload();
  };

  const getArtist = (e) => {
    e.stopPropagation();
    window.scrollTo(top);
    setState({
      type: "artist",
      query: track.artist_name,
    });
  };

  const getAlbum = (e) => {
    e.stopPropagation();
    window.scrollTo(top);
    setState({
      type: "album",
      query: track.album_title,
    });
  };

  useEffect(() => {
    const closeMenu = (event) => {
      if (
        !event.target.closest(".dropdown") &&
        !event.target.closest(".opt") &&
        !event.target.closest(".laylists_options_dropdown")
      ) {
        setOptOpen(false);
        setSure(false);
      }
    };

    document.addEventListener("mouseover", closeMenu);

    return () => {
      document.removeEventListener("mouseover", closeMenu);
    };
  });

  return (
    <article
      className={"track " + (isPlaying && playing ? "playing" : "")}
      onClick={() => {
        setCurrent(i);
        setPlaylist(playlist);
        setPlaying(true);
      }}
      tabIndex={"0"}
    >
      <img
        src={track.cover_album || track.cover || "/matcap.png"}
        style={{
          width: "50px",
          borderRadius: "50%",
          height: "50px",
          objectFit: "cover",
        }}
        className={isPlaying && playing ? "spin" : ""}
        alt={`${track.title}'s cover`}
      />
      <div>
        <h4 className="cut">{track.title}</h4>
        <div className="flex cut" style={{ justifyContent: "flex-start" }}>
          <p className="artist_album" onClick={getArtist}>
            {track.artist_name}
          </p>
          {track.album_title && (
            <div className="flex">
              <span>•</span>
              <p className="artist_album" onClick={getAlbum}>
                {track.album_title}
              </p>
            </div>
          )}
        </div>
      </div>

      <audio
        ref={audio}
        onCanPlay={() => {
          const d = new Date(audio.current.duration * 1000)
            .toISOString()
            .substring(14, 19);

          setDuration(d);
        }}
      >
        <source src={track.audio} type="audio/mpeg" />
      </audio>

      <div className="flex">
        <p id="duration">{duration}</p>
        <div>
          <span
            onClick={(event) => {
              event.stopPropagation();

              optOpen ? setOptOpen(false) : setOptOpen(true);
            }}
            className="material-symbols-outlined opt"
          >
            more_vert
          </span>
          <ul className={`dropdown ${optOpen ? "open" : ""} ${user_playlists.length > 0 ? "" : "solo"}`}>
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
                label={sure ? "Sure delete" : "Delete"}
                variant="option red"
                icon="delete"
              />
            </li>
            {user && user_playlists.length > 0 && (
              <li>
                <ul className="playlists_options_dropdown">
                  {user_playlists.length > 0 &&
                    user_playlists.map((item, index) => (
                      <PlaylistOptions
                        track={track._id}
                        key={index}
                        item={item}
                      />
                    ))}
                </ul>

                <Button label="Add to playlist" variant="option" icon="add" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default Track;
