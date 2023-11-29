import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch_get } from "../utils/utils";
import TrackList from "../components/TrackList";
import { PlayerContext } from "../contexts/playerContext.jsx";
import ProfileForm from "../components/Profile/ProfileForm";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const { state, setState } = useContext(PlayerContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.type == "upload") {
      setState({ type: "all", query: "" });
    }

    const fetch = async () => {
      try {
        const data = await fetch_get(`users/profile/${id}`);
        setProfile(data.profile);
        setPlaylist(data.publicTracks);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (!loading && profile.length == 0) {
    return (
      <div className="flex-column">
        <h2>User not found</h2>
      </div>
    );
  }

  return (
    <section className="container bg-grey">
      {profile && <ProfileForm profile={profile} />}
      <section>
        <h2>Tracks</h2>
        {playlist?.length > 0 && <TrackList playlist={playlist} />}
      </section>
    </section>
  );
}
