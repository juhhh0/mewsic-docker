export default function AdminTableColumn({data, field}){
    return (
        <td className="admin_td">
            {data && (field == "cover" || field == "audio" || field == "avatar") ? <a target="_blank" href={data}>link</a> : data}
        </td>
    )
}
