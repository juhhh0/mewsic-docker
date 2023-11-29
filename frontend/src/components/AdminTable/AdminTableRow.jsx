import GoogleIcon from "../GoogleIcon";
import AdminTableColumn from "./AdminTableColumn";

export default function AdminTableRow({ data, fields }) {
  console.log(data, fields);

  return (
    <tr>
      {fields.map((item, i) => (
        <AdminTableColumn data={data[fields[i]]} field={fields[i]} />
      ))}
      <td>
        <GoogleIcon type="edit" />
        <GoogleIcon type="delete" />
      </td>
    </tr>
  );
}
