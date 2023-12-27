import { useContext } from "react";
import { fetch_delete } from "../../utils/utils";
import GoogleIcon from "../GoogleIcon";
import AdminTableColumn from "./AdminTableColumn";
import { UserContext } from "../../contexts/userContext";

const adminModifiable = ["users", "tracks", "playlists", "albums", "artists"]

export default function AdminTableRow({ data, fields, type }) {

  const {user} = useContext(UserContext)

  const handleDelete = async () => {
    const confirm = window.confirm(`You are about to delete ${type} id: ${data._id}, are you sure ?`)
    if(confirm){
      await fetch_delete({endpoint: `admin/${type}/${data._id}`, user: user}).then(window.location.reload())
    }
  }

  const isModifiable = adminModifiable.includes(type)

  return (
    <tr>
      {fields.map((item, i) => (
        <AdminTableColumn key={i} data={data[fields[i]]} field={fields[i]} />
      ))}
      {
        isModifiable && (

          <td>
        <GoogleIcon type="delete" onClick={handleDelete} />
      </td>
      )}
    </tr>
  );
}
