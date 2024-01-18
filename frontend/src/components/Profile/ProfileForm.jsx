import { useContext, useState } from "react";
import GoogleIcon from "../GoogleIcon";
import Button from "../Button/Button";
import logo from "../../assets/img/logo.svg";
import { UserContext } from "../../contexts/userContext";

export default function ProfileForm({ profile }) {
  const [updateState, setUpdateState] = useState(false);
  const [changePassState, setChangePassState] = useState(false);
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("")
  const [succes, setSucces] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async (event) => {
    event.preventDefault();
    setError("")
    setMessage("")
   

    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/users/pass/${user.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          newPass: event.target.new.value,
          oldPass: event.target.old.value
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();

    if (!json.succes) {
      setError(json.error);
      setIsLoading(false);
    }

    if (json.succes) {
      setError(null);
      setIsLoading(false);
      setMessage(json.message)
    }
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    if (profile._id != user.id) {
      return;
    }

    let formData = new FormData();
    formData.append("avatar", event.target.avatar.files[0]);
    formData.append("pseudo", event.target.pseudo.value);

    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/users/profile/${user.id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();

    if (!json.succes) {
      setError(json.error);
      setIsLoading(false);
      setSucces(false);
    }

    if (json.succes) {
      setSucces(true);
      setError(null);
      setIsLoading(false);
      setUpdateState(false);
    }
  };

  if (!changePassState) {
    return (
      <form className="profile relative" onSubmit={updateProfile}>
        <div className="relative">
          <img
            src={avatar || profile.avatar || logo}
            className={`profile_img ${!avatar && !profile.avatar && "default"}`}
            alt={`${profile.pseudo}'s avatar`}
          />
          {updateState && (
            <>
              <input
                className="profile_input_img"
                name="avatar"
                id="avatar"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const src = URL.createObjectURL(file);
                  setAvatar(src);
                }}
              />
              <label className="profile_input_img_label" htmlFor="avatar">
                modifier
              </label>
            </>
          )}
        </div>
        <div>
          <div className="flex">
            <input
              type="text"
              placeholder={profile.pseudo}
              name="pseudo"
              disabled={!updateState}
              className="profile_input"
            />
            <GoogleIcon type="edit" variant={!updateState && "hidden"} />
          </div>
          <p className="profile_input">{profile.email}</p>
        </div>
        {user.id == profile._id && (
          <div className="upload_btn">
            {!updateState && (
              <Button
                label="Update profile"
                onClick={(event) => {
                  event.preventDefault();
                  setChangePassState(false);
                  setUpdateState(true);
                }}
              />
            )}
            {updateState && (
              <>
                <Button
                  label="Cancel"
                  onClick={(event) => {
                    event.preventDefault();
                    setUpdateState(false);
                  }}
                />
                <button type="submit" className="btn" disabled={isLoading}>
                  Submit
                </button>
                {error && <span className="error_span">{error}</span>}
              </>
            )}
            <Button
              label="Change pwd"
              onClick={(event) => {
                event.preventDefault();
                setUpdateState(false);
                setChangePassState(true);
              }}
            />
          </div>
        )}
      </form>
    );
  } else if (changePassState) {
    return (
      <form className="flex-column" onSubmit={changePassword}>
        <input
          type="password"
          className="input"
          name="old"
          placeholder="actual password"
        />
        <input
          type="password"
          name="new"
          className="input"
          placeholder="new password"
        />
        <div className="flex">
          <button className="btn" type="submit">
            Submit new password
          </button>
          <Button
            label="Cancel"
            onClick={() => {
              setChangePassState(false);
            }}
          />
        </div>
          {error && <p className="error_msg">{error}</p>}
          {message && <p className="succes_msg">{message}</p>}
      </form>
    );
  }
}
