import { useEffect } from "react";
import Track from "./Track/Track";

export default function TrackList({ playlist, user_playlists }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter"){
        const focusedElement = document.activeElement;
        focusedElement.click();
      }
    }

      document.addEventListener('keydown', handleKeyPress);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
   
  }, [])

  
  return (
    <div className="track_list">
      {playlist.map((track, i) => (
        <Track key={i} track={track} playlist={playlist} i={i} user_playlists={user_playlists} />
      ))}
    </div>
  );
}
