import { createContext, useState } from "react";

export const PlayerContext = createContext({
  playlist: null,
  current: 0,
  loop: false,
  random: false,
  playing: false,
  state: {
    type: "all",
    query: "",
  },
});

export const PlayerContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loop, setLoop] = useState(false);
  const [random, setRandom] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [state, setState] = useState({
    type: "all",
    query: "",
  });

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        setPlaylist,
        current,
        setCurrent,
        loop,
        setLoop,
        random,
        setRandom,
        playing,
        setPlaying,
        state,
        setState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
