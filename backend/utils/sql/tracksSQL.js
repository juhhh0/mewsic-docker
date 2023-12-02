import pool from "../database.js";

const trackFields =
  "t.*, a.name AS artist_name, al.title AS album_title, al.cover AS cover_album";

const getTracksSQL = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT ${trackFields}
    FROM tracks t 
    LEFT JOIN artists a ON a._id = t.artist_id 
    LEFT JOIN albums al ON al._id = t.album_id
    INNER JOIN users_tracks ut ON ut.track_id = t._id AND ut.user_id = ?
`,
    [id]
  );
  return rows;
};

const getTrackSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM tracks WHERE _id = ?", [id]);
  return rows[0];
};

const createTrackSQL = async (
  title,
  audio,
  audio_cloudinary_id,
  artist_id,
  album_id,
  cover_url,
  cover_id,
  owner_id
) => {
  const [result] = await pool.query(
    "INSERT INTO tracks (title, audio, audio_cloudinary_id, artist_id, album_id, cover, cover_cloudinary_id, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      audio,
      audio_cloudinary_id,
      artist_id,
      album_id,
      cover_url,
      cover_id,
      owner_id,
    ]
  );

  const id = result.insertId;

  return getTrackSQL(id);
};

const getTracksByArtistSQL = async (user_id, artist) => {
  const [rows] = await pool.query(
    `
    SELECT ${trackFields}
    FROM tracks t 
    INNER JOIN artists a ON a._id = t.artist_id AND a.name = ?
    LEFT JOIN albums al ON al._id = t.album_id
    INNER JOIN users_tracks ut ON ut.track_id = t._id AND ut.user_id = ?`,
    [artist, user_id]
  );
  return rows;
};

const getTracksArtistByArtistIdSQL = async (artist_id) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM tracks WHERE artist_id = ?
    `,
    [artist_id]
  );
  return rows;
};

const getTracksAlbumByAlbumIdSQL = async (album_id) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM tracks WHERE album_id = ?
    `,
    [album_id]
  );
  return rows;
};

const getTracksByAlbumSQL = async (user_id, album) => {
  const [rows] = await pool.query(
    `
    SELECT ${trackFields}
    FROM tracks t 
     LEFT JOIN artists a ON a._id = t.artist_id
     INNER JOIN albums al ON al._id = t.album_id AND al.title = ?
     INNER JOIN users_tracks ut ON ut.track_id = t._id AND ut.user_id = ?`,
    [album, user_id]
  );
  return rows;
};

const createUserTrackSQL = async (user_id, track_id) => {
  await pool.query(
    "INSERT INTO users_tracks (user_id, track_id) VALUES (?, ?)",
    [user_id, track_id]
  );
};

const deleteTrackSQL = async (track_id) => {
  const [result] = await pool.query(`DELETE FROM tracks WHERE _id = ?`, [
    track_id,
  ]);
};

const deleteUserTrackSQL = async (user_id, track_id) => {
  const [result] = await pool.query(
    `DELETE FROM users_tracks WHERE track_id = ? AND user_id = ?`,
    [track_id, user_id]
  );
};

const getUsersTracksSQL = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM users_tracks WHERE track_id = ?",
    [id]
  );

  return rows;
};

const togglePublicTrackSQL = async (id) => {
  await pool.query("UPDATE tracks SET public = !public WHERE _id = ?", [id]);
};

const getPublicTracksSQL = async (id) => {
  const [rows] = await pool.query(
    `
  SELECT ${trackFields}
  FROM tracks t
  LEFT JOIN artists a ON a._id = t.artist_id
  LEFT JOIN albums al ON al._id = t.album_id
  INNER JOIN users_tracks ut ON ut.track_id = t._id AND ut.user_id = ? AND t.public = 1 AND t.owner_id = ut.user_id
  `,
    [id]
  );

  return rows;
};

const getAllTracksSQL = async () => {
  const [rows] = await pool.query(`
    SELECT _id, title, audio, artist_id, album_id, public, cover FROM tracks;
    `);

  return rows;
};

const getAllUsersTracksSQL = async () => {
  const [rows] = await pool.query(`
    SELECT user_id, track_id FROM users_tracks;
    `);

  return rows;
};

const searchTracksByTitleSQL = async (query) => {
  const [rows] = await pool.query(
    `SELECT ${trackFields}
    FROM tracks t  
    LEFT JOIN artists a ON a._id = t.artist_id  
    LEFT JOIN albums al ON al._id = t.album_id
    WHERE t.title LIKE ? AND t.public = 1`,
    [query]
  );
  return rows;
};

const isLikedSQL = async (id, user) => {
  const [rows] = await pool.query(
    "SELECT * FROM users_tracks WHERE user_id = ? AND track_id = ?",
    [user, id]
  );

  return rows.length > 0;
};

const likeSQL = async (user, id) => {
  await pool.query(
    "INSERT INTO users_tracks (user_id, track_id) VALUES (?, ?)",
    [user, id]
  );
};

const dislikeSQL = async (user, id) => {
  await pool.query(
    "DELETE FROM users_tracks WHERE user_id = ? AND track_id = ?",
    [user, id]
  );
};

const deleteUsersTracksByTrackSQL = async (id) => {
  await pool.query("DELETE FROM users_tracks WHERE track_id = ?", [id]);
};

const adminDeleteTrackSQL = async (id) => {
  const track = getTrackSQL(id)
  
  await pool.query("DELETE FROM playlists_tracks WHERE track_id = ?", [id])
  await pool.query("DELETE FROM users_tracks WHERE track_id = ?", [id])
  await pool.query("DELETE FROM tracks WHERE _id = ?", [id])

  return track
}

export {
  adminDeleteTrackSQL,
  likeSQL,
  dislikeSQL,
  getTracksSQL,
  deleteUsersTracksByTrackSQL,
  getTracksByArtistSQL,
  getTracksArtistByArtistIdSQL,
  getTracksByAlbumSQL,
  createTrackSQL,
  createUserTrackSQL,
  deleteTrackSQL,
  deleteUserTrackSQL,
  getTracksAlbumByAlbumIdSQL,
  getTrackSQL,
  getUsersTracksSQL,
  togglePublicTrackSQL,
  getPublicTracksSQL,
  getAllTracksSQL,
  getAllUsersTracksSQL,
  searchTracksByTitleSQL,
  isLikedSQL,
};
