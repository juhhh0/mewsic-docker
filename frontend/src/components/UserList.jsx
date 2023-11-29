import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";

export default function UserList({ users }) {
  return (
    <ul className="user_list">
      {users.length > 0 &&
        users.map((user) => (
          <Link to={`/profile/${user._id}`}>
            <li className="flex">
              <img
                src={user.avatar || logo}
                className={`profile_img ${!user.avatar && "default"}`}
                alt={"avatar of " + user.pseudo}
              />
              {user.pseudo}
            </li>
          </Link>
        ))}
    </ul>
  );
}
