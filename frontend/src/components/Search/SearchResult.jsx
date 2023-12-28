import { useContext } from "react";
import { PlayerContext } from "../../contexts/playerContext";


export default function SearchResult({ data }) {
  const {setState} = useContext(PlayerContext)
  console.log(data)
  return (
    <div className="search_result">
      <ul>
        {data?.albums?.length > 0 && <li>Albums :</li>}
      {data?.albums?.length > 0 && data.albums.map((item, index) => (
        <li onClick={() => {
          setState({type: "album", query: item.title})
        }} key={index}>
          <img src={item.cover || "/matcap.png"} alt="" className="cover" />
          {item.title}
          </li>
      ))}
      </ul>
      <ul>
      {data?.artists?.length > 0 && <li>Artists :</li>}
      {data?.artists?.length > 0 && data.artists.map((item, index) => (
        <li onClick={() => {
          setState({type: "artist", query: item.name})
        }} key={index}>
          {item.name}
          </li>
      ))}
      </ul>

    </div>
  );
}
