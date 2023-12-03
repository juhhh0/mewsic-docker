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
    WHERE t.user_id = ?
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
  user_id
) => {
  const [result] = await pool.query(
    "INSERT INTO tracks (title, audio, audio_cloudinary_id, artist_id, album_id, cover, cover_cloudinary_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      audio,
      audio_cloudinary_id,
      artist_id,
      album_id,
      cover_url,
      cover_id,
      user_id,
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
    WHERE t.user_id = ?
    `,
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
     WHERE t.user_id = ?`,
    [album, user_id]
  );
  return rows;
};

const deleteTrackSQL = async (track_id) => {
  const [result] = await pool.query(`DELETE FROM tracks WHERE _id = ?`, [
    track_id,
  ]);
};


const getAllTracksSQL = async () => {
  const [rows] = await pool.query(`
    SELECT _id, title, audio, artist_id, album_id, cover, user_id FROM tracks;
    `);

  return rows;
};

const searchTracksByTitleSQL = async (query, id) => {
  const [rows] = await pool.query(
    `SELECT ${trackFields}
    FROM tracks t  
    LEFT JOIN artists a ON a._id = t.artist_id  
    LEFT JOIN albums al ON al._id = t.album_id
    WHERE t.title LIKE ? AND t.user_id = ?`,
    [query, id]
  );
  return rows;
};

const adminDeleteTrackSQL = async (id) => {
  const track = getTrackSQL(id)

  await pool.query("DELETE FROM playlists_tracks WHERE track_id = ?", [id])
  await pool.query("DELETE FROM tracks WHERE _id = ?", [id])

  return track
}

export {
  adminDeleteTrackSQL,
  getTracksSQL,
  getTracksByArtistSQL,
  getTracksArtistByArtistIdSQL,
  getTracksByAlbumSQL,
  createTrackSQL,
  deleteTrackSQL,
  getTracksAlbumByAlbumIdSQL,
  getTrackSQL,
  getAllTracksSQL,
  searchTracksByTitleSQL,
};
