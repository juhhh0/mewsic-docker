import { getArtistsSQL, searchArtistsByTitleSQL } from "../utils/sql/artistsSQL.js";
import { getAlbumsSQL, searchAlbumByTitleSQL } from "../utils/sql/albumsSQL.js";
import { searchUsersByPseudoSQL } from "../utils/sql/usersSQL.js";
import { searchTracksByTitleSQL } from "../utils/sql/tracksSQL.js";

const getUserArtists = async (req, res) => {
  const id = req.user;

  const artists = await getArtistsSQL(id);

  res.status(200).json(artists);
};

const getUserAlbums = async (req, res) => {
  const id = req.user;

  const albums = await getAlbumsSQL(id);

  res.status(200).json(albums);
};

const search = async (req, res) => {
  let { query } = req.params;
  const id = req.user;
  query = `%${query}%`;
  const tracks = await searchTracksByTitleSQL(query, id);
  const albums = await searchAlbumByTitleSQL(query, id)
  const artists = await searchArtistsByTitleSQL(query, id)
  
  res.status(200).json({ tracks, albums, artists });
};

export { search, getUserArtists, getUserAlbums };
