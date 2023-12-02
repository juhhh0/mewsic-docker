import AdminTableRow from "./AdminTableRow";
import "./Admin.css";

const fields = {
  users: ["_id", "pseudo", "email", "avatar", "verified", "role"],
  tracks: ["_id", "title", "audio", "cover", "album_id", "artist_id", "public"],
  albums: ["_id", "title", "cover"],
  artists: ["_id", "name"],
  playlists: ["_id", "title", "user_id"],
  playlists_tracks: ["playlist_id", "track_id"],
  users_tracks: ["user_id", "track_id"],
};

export default function AdminTable({ data, type }) {
  return (
    <div className="admin_table">
      <h2>{type}</h2>
      <div className="table_wrapper">
        <table>
          <thead>
            <tr>
              {fields[type].map((item, i) => (
                <td key={i} className="admin_td">
                  {item}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, i) => (
                <AdminTableRow
                  key={i}
                  type={type}
                  data={item}
                  fields={fields[type]}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
