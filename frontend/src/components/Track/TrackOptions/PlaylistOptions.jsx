import Button from "../../Button/Button";
import GoogleIcon from "../../GoogleIcon";

export default function PlaylistOptions() {
    return(
        <li>
          
                <ul className="playlists_options_dropdown">
                    <li>hello <GoogleIcon type="add" /></li>
                    <li>hello <GoogleIcon type="add" /></li>
                    <li>hello <GoogleIcon type="add" /></li>
                    <li>hello <GoogleIcon type="add" /></li>
                    <li>hello <GoogleIcon type="add" /></li>
                </ul>
        
            <Button label="Add to playlist" variant="option" icon="add" />
        </li>
    )
}