import { useContext, useEffect, useRef, useState } from "react";
import { Autocomplete } from "@mui/material";
import { UserContext } from "../contexts/userContext.jsx";
import Button from "./Button/Button";
import { fetch_get } from "../utils/utils.js";

export default function UploadForm() {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(false);

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
    } else {
      value = e?.target.value;
    }
    setData({ ...data, [name]: value });
    console.log(data);
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
      setEmptyFields(json.emptyFields);
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
      setEmptyFields([]);
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
                emptyFields?.includes("title") ? "input error" : "input"
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
                      emptyFields?.includes("artist") ? "input error" : "input"
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
                    emptyFields?.includes("album") ? "input error" : "input"
                  }
                />
              </div>
            )}
          />
        </div>

        <div className="flex-column">
          <div>
            <label>Cover</label>
            <input
              onChange={handleChange("cover")}
              type="file"
              accept="image/*"
              name="cover"
              className={emptyFields?.includes("cover") ? "error" : "input"}
            />
          </div>

          <div>
            <label>Audio</label>
            <input
              onChange={handleChange("audio")}
              type="file"
              accept="audio/*"
              name="audio"
              className={emptyFields?.includes("audio") ? "error" : "input"}
            />
          </div>
        </div>
        {cover && <img style={{ width: "100px" }} src={cover} alt="" />}
      </section>
      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading || succes}
        onClick={handleSubmit}
        label={"Submit"}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {succes && <p style={{ color: "green" }}>Track Uploaded !</p>}
    </form>
  );
}
