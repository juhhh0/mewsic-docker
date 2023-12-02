import { useState, useRef, useContext } from "react";
import "./Player.css";
import { PlayerContext } from "../../contexts/playerContext.jsx";
import GoogleIcon from "../GoogleIcon";

function Player() {
  const {
    playlist,
    current,
    setCurrent,
    random,
    setRandom,
    loop,
    setLoop,
    playing,
    setPlaying,
  } = useContext(PlayerContext);

  const dropdown = useRef(null);
  const openPlayerIcon = useRef(null);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [statevolum, setStateVolum] = useState(1);

  const audio = useRef("audio_tag");

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + ~~s;
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };

  const nextAudio = () => {
    if (random) {
      const random = Math.round(Math.random() * playlist.length);
      setCurrent(random);
    } else if (loop) {
      setCurrent(current);
      audio.current.currentTime = 0;
    } else {
      current == playlist.length - 1 ? setCurrent(0) : setCurrent(current + 1);
    }
  };

  const prevAudio = () => {
    current == 0 ? setCurrent(playlist.length - 1) : setCurrent(current - 1);
  };

  const toggleRandom = () => {
    setRandom(!random);
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const toggleAudio = () => {
    setPlaying(!playing);
    audio.current.paused ? audio.current.play() : audio.current.pause();
  };

  const handleVolume = (q) => {
    setStateVolum(q);
    audio.current.volume = q;
  };

  if (playlist != null && playlist[current] != null) {
    if (playlist.length > 0) {
      return (
        <>
          <audio
            loop={loop ? true : false}
            src={playlist[current]?.audio}
            ref={audio}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onCanPlay={(e) => setDur(e.target.duration)}
            onEnded={nextAudio}
            autoPlay
          />
          <div className="player-big">
            <div className="meta-track">
              <img
                src={
                  playlist[current]?.cover_album ||
                  playlist[current]?.cover ||
                  "/matcap.png"
                }
                alt=""
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />

              <div>
                <h4>{playlist[current]?.title}</h4>
                <div className="flex" style={{ justifyContent: "flex-start" }}>
                  <p>{playlist[current]?.artist_name}</p>
                  {playlist[current]?.album_title && (
                    <div className="flex">
                      <span>•</span>
                      <p>{playlist[current]?.album_title}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="player-controls">
              <div style={{ display: "flex", gap: "40px" }}>
                <GoogleIcon
                  type="repeat"
                  variant={loop && "active"}
                  onClick={toggleLoop}
                />
                <GoogleIcon type="skip_previous" onClick={prevAudio} />
                <GoogleIcon
                  type={playing ? "pause" : "play_arrow"}
                  onClick={toggleAudio}
                />
                <GoogleIcon type="skip_next" onClick={nextAudio} />
                <GoogleIcon
                  type="shuffle"
                  variant={random && "active"}
                  onClick={toggleRandom}
                />
              </div>
              <div className="flex">
                <span>{fmtMSS(currentTime)}</span>
                <input
                  className="progress"
                  type="range"
                  onChange={handleProgress}
                  value={dur ? (currentTime * 100) / dur : 0}
                  style={{ width: "400px" }}
                />
                <span>{fmtMSS(dur)}</span>
              </div>
            </div>
            <div className="flex-column volumn">
              <div className="flex">
                <GoogleIcon type="volume_down" />
                <input
                  className="progress"
                  value={Math.round(statevolum * 100)}
                  type="range"
                  onChange={(e) => handleVolume(e.target.value / 100)}
                />
              </div>
            </div>
          </div>
          <div className="player-small player-hide" ref={dropdown}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              onClick={() => {
                dropdown.current.classList.toggle("player-hide");
                openPlayerIcon.current.classList.toggle("rotate");
              }}
            >
              <img
                src={
                  playlist[current]?.cover_album ||
                  playlist[current]?.cover ||
                  "/matcap.png"
                }
                alt=""
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <h3 className="cut">{playlist[current]?.title}</h3>
                <div style={{ display: "flex", gap: "5px" }} className="cut">
                  <p>{playlist[current]?.artist_name}</p>
                  {playlist[current]?.album_title && (
                    <>
                      <span>•</span>
                      <p>{playlist[current]?.album_title}</p>
                    </>
                  )}
                </div>
              </div>

              <span
                style={{
                  position: "absolute",
                  right: "15px",
                  transition: "all 0.5s ease-in-out",
                }}
                className="material-symbols-outlined"
                ref={openPlayerIcon}
              >
                play_arrow
              </span>
            </div>
            <div className="player-dropdown">
              <div className="controls">
                <GoogleIcon
                  type="repeat"
                  variant={loop && "active"}
                  onClick={toggleLoop}
                />
                <GoogleIcon type="skip_previous" onClick={prevAudio} />
                <GoogleIcon
                  type={playing ? "pause" : "play_arrow"}
                  onClick={toggleAudio}
                />
                <GoogleIcon onClick={nextAudio} type="skip_next" />
                <GoogleIcon
                  type="shuffle"
                  variant={random && "active"}
                  onClick={toggleRandom}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <span>{fmtMSS(currentTime)}</span>/<span>{fmtMSS(dur)}</span>
                <input
                  className="progress"
                  type="range"
                  onChange={handleProgress}
                  value={dur ? (currentTime * 100) / dur : 0}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Player;
