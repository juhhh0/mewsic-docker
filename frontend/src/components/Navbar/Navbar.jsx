import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import { UserLogout } from "../../utils/hooks/userLogout";
import "./Navbar.css";
import { UserContext } from "../../contexts/userContext.jsx";
import { PlayerContext } from "../../contexts/playerContext.jsx";
import Button from "../Button/Button";
import ButtonLink from "../Button/ButtonLink";
import GoogleIcon from "../GoogleIcon";
import SearchBar from "../Search/SearchBar";

function Navbar() {
  const { state, setState } = useContext(PlayerContext);
  const menu = useRef(null);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const setUploadState = () => {
    if (location.pathname != "/") {
      navigate("/");
    }
    setState({
      type: "upload",
      query: "",
    });
  };

  const { logout } = UserLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <Link to="/" className="navbar_logo_wrapper">
        <img src={logo} alt="Logo Mewsic" className="navbar_logo" />
        <h1 className="navbar_title">Mewsic</h1>
      </Link>
      {user && location.pathname != "/admin" && <SearchBar />}
      <nav>
        <div className="navbar_desk">
          {user && (
            <>
              {state.type != "upload" && (
                <Button label="Upload" onClick={setUploadState} />
              )}
              <ButtonLink href={"/profile/" + user.id} label={user.pseudo} />
              {user.admin == 1 && <ButtonLink href="/admin" label="Admin" />}
              <Button label="Log Out" onClick={handleClick} variant="black" />
            </>
          )}
          {!user && (
            <>
              <ButtonLink href="/login" variant="black" label="Login" />
              <ButtonLink href="/signup" label="Sign up" />
            </>
          )}
        </div>
        <div className="navbar_mobile">
          <GoogleIcon
            type="menu"
            onClick={() => {
              menu.current.classList.toggle("hide");
            }}
          />

          {user && (
            <ul ref={menu} className="mobile_nav hide">
              {state.type != "upload" && (
                <li>
                  <Button
                    label="Upload"
                    onClick={setUploadState}
                    variant="mobile"
                  />
                </li>
              )}
              <li>
                <ButtonLink
                  href={"/profile/" + user.id}
                  variant="mobile"
                  label="Profile"
                />
              </li>
              {user.admin == 1 && (
                <li>
                  <ButtonLink href="/admin" variant="mobile" label="Admin" />
                </li>
              )}
              <li>
                <Button
                  label="Log Out"
                  onClick={handleClick}
                  variant="mobile black"
                />
              </li>
            </ul>
          )}
          {!user && (
            <ul ref={menu} className="mobile_nav hide">
              <li>
                <ButtonLink
                  href="/login"
                  variant="mobile black"
                  label="Login"
                />
              </li>
              <li>
                <ButtonLink href="/signup" variant="mobile" label="Sign up" />
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
