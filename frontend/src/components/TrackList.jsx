import Track from "./Track/Track";

export default function TrackList({ playlist }) {
  return (
    <div className="track_list">
      {playlist.map((track, i) => (
        <Track key={i} track={track} playlist={playlist} i={i} />
      ))}
    </div>
  );
}
