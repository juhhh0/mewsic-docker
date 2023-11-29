import { useState, useRef, useContext } from "react";
import "./Track.css";
import { useEffect } from "react";
import { PlayerContext } from "../../contexts/playerContext.jsx";
import axios from "axios";
import { UserContext } from "../../contexts/userContext.jsx";
import Button from "../Button/Button";
import { fetch_get, fetch_post } from "../../utils/utils";

function Track({ track, i, playlist }) {
  const [duration, setDuration] = useState(0);
  const audio = useRef(null);
  const [optOpen, setOptOpen] = useState(false);
  const [visibility, setVisibility] = useState(track.public);
  const [liked, setLiked] = useState(false);
  const [loadingPublic, setLoadingPublic] = useState(false);
  const [sure, setSure] = useState(false);
  const {
    setPlaylist,
    setCurrent,
    setState,
    current,
    playing,
    setPlaying,
  } = useContext(PlayerContext);

  const { user } = useContext(UserContext);

  const handleDelete = () => {
    if (!user) {
      return;
    }

    axios
      .delete(`https://${import.meta.env.VITE_URL}:3001/api/tracks/${track._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (response.data.statut) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const togglePublic = async () => {
    setLoadingPublic(true);
    await fetch_post({endpoint: `tracks/${track._id}`, user: user})
    
    setLoadingPublic(false);
    setVisibility(!visibility);
    
    if(visibility){
      window.location.reload();
    }
  };

  const likeTrack = async () => {
    await fetch_post({endpoint: `tracks/like/${track._id}`, user: user})
    setLiked(!liked);

    if (!liked) {
      window.location.reload();
    }
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
      if (!event.target.closest(".dropdown") && !event.target.closest(".opt")) {
        setOptOpen(false);
        setSure(false);
      }
    };

    document.addEventListener("mouseover", closeMenu);

    return () => {
      document.removeEventListener("mouseover", closeMenu);
    };
  });
  useEffect(() => {
    const fetch = async () => {
      const data = await fetch_get(`tracks/liked/${track._id}`, user)
      setLiked(data);
    };

    if (!isOwner) {
      fetch();
    }
  }, []);

  const isOwner = user.id === track.owner_id;
  return (
    <article
      className={"track " + (current === i && playing ? "playing" : "")}
      onClick={() => {
        setCurrent(i);
        setPlaylist(playlist);
        setPlaying(true);
      }}
    >
      <img
        src={track.cover_album || track.cover || "/matcap.png"}
        style={{
          width: "50px",
          borderRadius: "50%",
          height: "50px",
          objectFit: "cover",
        }}
        className={current === i && playing ? "spin" : ""}
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
          <ul className={`dropdown ${optOpen && "open"} ${!isOwner && "solo"}`}>
            {isOwner && (
              <>
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
                {/* <li>
                  <Button
                    label="Public"
                    disabled={loadingPublic}
                    variant="option"
                    icon={visibility ? "visibility" : "visibility_off"}
                    onClick={(event) => {
                      event.stopPropagation();
                      togglePublic();
                    }}
                  />
                </li> */}
              </>
            )}
            {/* {!isOwner && (
              <li>
                <Button
                  label={liked ? "Dislike" : "Like"}
                  variant={`option`}
                  icon={liked ? "heart_minus" : "favorite"}
                  onClick={(event) => {
                    event.stopPropagation();
                    likeTrack();
                  }}
                />
              </li>
            )} */}
            {user && (
              <li>
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
