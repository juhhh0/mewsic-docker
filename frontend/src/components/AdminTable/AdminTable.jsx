import AdminTableRow from "./AdminTableRow";
import "./Admin.css";

const fields = {
  users: ["_id", "pseudo", "email","avatar", "verified", "role"],
  tracks: ["_id", "title", "audio", "cover", "album_id", "artist_id", "public"],
  albums: ["_id", "title", "cover"],
  artists: ["_id", "name"],
  users_tracks: ["user_id", "track_id"],
};

export default function AdminTable({ data, type }) {
  return (
    <div className="admin_table">
      <h2>{type}</h2>
      <table>
        <thead>
          <tr>
            {fields[type].map((item) => (
              <td className="admin_td">{item}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <AdminTableRow data={item} fields={fields[type]} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
