import { adminDeleteAlbumSQL, getAllAlbumsSQL } from "../utils/sql/albumsSQL.js";
import { adminDeleteArtistSQL, getAllArtistsSQL } from "../utils/sql/artistsSQL.js";
import {
  adminDeleteTrackSQL,
  getAllTracksSQL,
} from "../utils/sql/tracksSQL.js";
import { adminDeleteUserSQL, getAllUsersSQL, getUserSQL } from "../utils/sql/usersSQL.js";
import createTemplate from "../utils/utils.js";
import mailTransport from "../utils/nodemailer.js";
import cloudinary from "../utils/cloudinary.js";
import { getAllPlaylistsSQL, getAllPlaylistsTracksSQL } from "../utils/sql/playlistsSQL.js";

const getTables = async (req, res) => {
  const users = await getAllUsersSQL();
  const tracks = await getAllTracksSQL();
  const albums = await getAllAlbumsSQL();
  const artists = await getAllArtistsSQL();
  const playlists = await getAllPlaylistsSQL();
  const playlists_tracks = await getAllPlaylistsTracksSQL();

  const user_id = req.user;
  const user = await getUserSQL(user_id)

  if(user.role != 1){
    return res.status(401).json({error: "You must be admin to view the tables"})
  }

  return res.status(200).json({ users, tracks, albums, artists, playlists, playlists_tracks });
};

const contactAdmin = async (req, res) => {
  const { message, subject } = req.body;
  const id = req.user;

  const user = await getUserSQL(id)

  if ( !subject || !message) {
    return res.json({ succes: false, error: "all fields must be filled" });
  }

  try {
    const html = createTemplate({
      file: "email_admin.html",
      params: {
        email: user.email,
        id: user._id,
        subject: subject,
        message: message,
      },
    });

    mailTransport().sendMail({
      from: '"Mewsic Contact" <mewsic.dev@gmail.com>',
      to: "joris.mansion.dev@gmail.com",
      replyTo: user.email,
      subject: "An user need help",
      html: html,
    });

    return res.json({
      succes: true,
      message: "an email has been sent to the admin, you'll get an answer soon",
    });
  } catch (e) {
    console.log(e);

    return res.json({ succes: false, error: "server error" });
  }
};

const adminDeleteUser = async (req, res) => {
  const {id} = req.params

  const user_id = req.user;
  const user = await getUserSQL(user_id)

  if(user.role != 1){
    return res.status(401).json({error: "You must be admin"})
  }

  try{
    const mediaToDelete = await adminDeleteUserSQL(id)

    for(let i = 0; i < mediaToDelete.length; i++){
      await cloudinary.uploader.destroy(mediaToDelete[i].audio_cloudinary_id, {
        resource_type: "video",
      });
      
      if (mediaToDelete[i]?.cover_cloudinary_id) {
        await cloudinary.uploader.destroy(mediaToDelete[i].cover_cloudinary_id);
      }
    }
    return res.status(200)
  }catch(error){
    res.status(500)
  }

}

const adminDeleteTrack = async (req, res) => {
  const {id} = req.params
  try{
    const track = await adminDeleteTrackSQL(id)

      await cloudinary.uploader.destroy(track.audio_cloudinary_id, {
        resource_type: "video",
      });
      
      if (track?.cover_cloudinary_id) {
        await cloudinary.uploader.destroy(track.cover_cloudinary_id);
      }

    return res.status(200)
  }catch(error){
    res.status(500)
  }
}


const adminDeleteAlbum = async (req, res) => {
  const {id} = req.params
  try{
    const album = await adminDeleteAlbumSQL(id)

    if(album.cover_cloudinary_id){
      await cloudinary.uploader.destroy(album.cover_cloudinary_id);
    }
    return res.status(200)
  }catch(error){
    return res.status(500)
  }
}

const adminDeleteArtist = async (req, res) => {
  const {id} = req.params
  try{
    await adminDeleteArtistSQL(id)
    return res.status(200)
  }catch(error){
    return res.status(500)
  }
}




export { getTables, contactAdmin, adminDeleteUser, adminDeleteTrack, adminDeleteAlbum, adminDeleteArtist };
