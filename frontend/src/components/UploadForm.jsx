import { useContext, useEffect, useRef, useState } from "react";
import { Autocomplete } from "@mui/material";
import { UserContext } from "../contexts/userContext.jsx";
import Button from "./Button/Button";
import { fetch_get } from "../utils/utils.js";

export default function UploadForm() {
  const [error, setError] = useState(null);
  const [errorFields, setErrorFields] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const [audioName, setAudioName] = useState("")

  const [data, setData] = useState({
    title: "",
    artist: "",
    album: "",
    cover: "",
    audio: "",
  });

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [cover, setCover] = useState("");
  const artist = useRef(null);

  const { user } = useContext(UserContext);

  const handleChange = (name) => (e) => {
    let value = "";
    if (name === "cover" || name === "audio") {
      value = e?.target.files[0];

      if (name === "cover") {
        setPreview(e?.target.files[0]);
      }

      if(name === "audio"){
        setAudioName(e?.target.files[0].name)
      }
    } else {
      value = e?.target.value;
    }
    
    if(name === "album"){
      let isRegisteredAlbum = false
     for (let i = 0; i < albums.length; i++) {
      if(albums[i].label == e?.target.value){
        isRegisteredAlbum = true
        setCover(albums[i].cover)
      }
     }
     if(!isRegisteredAlbum){
      setCover("")
     }
    }
    setData({ ...data, [name]: value });
  };

  const onAutoComplete = (name) => (e, newValue) => {
    setData({ ...data, [name]: newValue.label });
    if (name === "album") {
      setCover(newValue.cover);
      setData({
        ...data,
        ["album"]: newValue.label,
        ["cover"]: newValue.cover || "",
      });
    }
  };

  const setPreview = (files) => {
    if (files) {
      const src = URL.createObjectURL(files);
      setCover(src);
    }
  };

  const getUserArtists = async () => {
    const data = await fetch_get("tracks/artists", user);
    setArtists(data);
  };

  const getUserAlbums = async () => {
    const data = await fetch_get("tracks/albums", user);
    setAlbums(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      return setError("You must be logged in");
    }

    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("audio", data.audio);
    formData.append("artist", data.artist);
    formData.append("album", data.album);
    formData.append("cover", data.cover);

    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/tracks`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setErrorFields(json.fields)
      setIsLoading(false);
      setSucces(false);
    }

    if (res.ok) {
      setData({
        title: "",
        artist: "",
        album: "",
        cover: "",
        audio: "",
      });
      setSucces(true);
      setError(null);
      setErrorFields([]);
      setIsLoading(false);
      refresh_after_timer()
    }
  };

  useEffect(() => {
    getUserArtists();
    getUserAlbums();
  }, []);


  const refresh_after_timer = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-column">
      <h2>Upload</h2>
      <section className="upload_form">
        <div className="flex-column">
          <div>
            <label>Title</label>
            <input
              onChange={handleChange("title")}
              type="text"
              name="title"
              className={
                errorFields?.includes("title") ? "input error" : "input"
              }
            />
          </div>
          <div>
            <Autocomplete
              freeSolo
              disablePortal
              name="album"
              onChange={onAutoComplete("artist")}
              onInputChange={handleChange("artist")}
              options={artists}
              ref={artist}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <label>Artist</label>

                  <input
                    type="text"
                    {...params.inputProps}
                    className={
                      errorFields?.includes("artist") ? "input error" : "input"
                    }
                  />
                </div>
              )}
            />
          </div>

          <Autocomplete
            freeSolo
            disablePortal
            name="album"
            onChange={onAutoComplete("album")}
            onInputChange={handleChange("album")}
            options={albums}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <label>Album</label>
                <input
                  type="text"
                  {...params.inputProps}
                  className={
                    errorFields?.includes("album") ? "input error" : "input"
                  }
                />
              </div>
            )}
          />
        </div>

        <div className="flex-column">
          <div>
            <input
              onChange={handleChange("cover")}
              type="file"
              accept="image/*"
              name="cover"
              disabled={cover}
              id="cover"
              className={`inputfile ${cover ? "disabled" : ""}`}
            />
            <label htmlFor="cover">Cover</label>

          </div>

          <div>
            <input
              onChange={handleChange("audio")}
              type="file"
              accept="audio/*"
              name="audio"
              id="audio"
              className={errorFields?.includes("audio") ? "inputfile error" : "inputfile"}
            />
            <label htmlFor="audio">{audioName.slice(0, 36) || "Audio"}</label>
          </div>
        </div>
        {cover && <img style={{ width: "100px" }} src={cover} alt="cover preview" />}
      </section>
      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading || succes}
        onClick={handleSubmit}
        label={"Submit"}
      />
      {error && <p className="error_msg">{error}</p>}
      {succes && <p className="succes_msg">Track Uploaded !</p>}
    </form>
  );
}
