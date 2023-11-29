import { getAllAlbumsSQL } from "../utils/sql/albumsSQL.js";
import { getAllArtistsSQL } from "../utils/sql/artistsSQL.js";
import {
  getAllTracksSQL,
  getAllUsersTracksSQL,
} from "../utils/sql/tracksSQL.js";
import { getAllUsersSQL, getUserSQL } from "../utils/sql/usersSQL.js";
import createTemplate from "../utils/utils.js";
import mailTransport from "../utils/nodemailer.js";

const getTables = async (req, res) => {
  const users = await getAllUsersSQL();
  const tracks = await getAllTracksSQL();
  const albums = await getAllAlbumsSQL();
  const artists = await getAllArtistsSQL();
  const users_tracks = await getAllUsersTracksSQL();

  return res.status(200).json({ users, tracks, albums, artists, users_tracks });
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

export { getTables, contactAdmin };
