import pool from "../database.js";

const getUserPlaylistsSQL = async (user) => {
  const [rows] = await pool.query(
    `
    SELECT * FROM playlists WHERE user_id = ?
  `,
    [user]
  );
  for (let i = 0; i < rows.length; i++) {
    const playlists_tracks = await getPlaylistTracksSQL(rows[i]._id);
    rows[i].tracks = playlists_tracks;
  }

  return rows;
};

const getPlaylistTracksSQL = async (id) => {
  const [rows] = await pool.query(
    `
  SELECT tracks.*, a.name AS artist_name, al.title AS album_title, al.cover AS cover_album
  FROM tracks
  LEFT JOIN artists a ON a._id = tracks.artist_id 
  LEFT JOIN albums al ON al._id = tracks.album_id
  INNER JOIN playlists_tracks ON tracks._id = playlists_tracks.track_id
  WHERE playlists_tracks.playlist_id = ?
  `,
    [id]
  );

  return rows;
};

const getPlaylistTrackByTitleSQL = async (title, user) => {
  const [rows] = await pool.query(
    `
  SELECT tracks.*, a.name AS artist_name, al.title AS album_title, al.cover AS cover_album
  FROM tracks
  LEFT JOIN artists a ON a._id = tracks.artist_id 
  LEFT JOIN albums al ON al._id = tracks.album_id
  INNER JOIN playlists_tracks ON tracks._id = playlists_tracks.track_id
  INNER JOIN playlists ON playlists._id = playlists_tracks.playlist_id AND playlists.title = ?
  WHERE tracks.user_id = ?
  `,
    [title, user]
  );

  return rows;
};

const getPlaylistByTitleSQL = async (title, user) => {
  const [rows] = await pool.query(
    "SELECT _id FROM playlists WHERE title = ? AND user_id = ?",
    [title, user]
  );

  return rows[0];
};

const getPlaylistSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM playlists WHERE _id = ?", [
    id,
  ]);

  return rows[0];
};

const createPlaylistSQL = async (title, user) => {
  const [result] = await pool.query(
    "INSERT INTO playlists (title, user_id) VALUES (?, ?)",
    [title, user]
  );

  const id = result.insertId;

  return getPlaylistSQL(id);
};

const addTrackPlaylistSQL = async (track, playlist) => {
  await pool.query(
    "INSERT INTO playlists_tracks (track_id, playlist_id) VALUES (?, ?)",
    [track, playlist]
  );
};

const deleteTrackPlaylistSQL = async (track, playlist) => {
  await pool.query(
    "DELETE FROM playlists_tracks WHERE track_id = ? AND playlist_id = ?",
    [track, playlist]
  );
};

const deleteAllPlaylistsTracksSQL = async (playlist) => {
  await pool.query("DELETE FROM playlists_tracks WHERE playlist_id = ?", [
    playlist,
  ]);
};

const deletePlaylistSQL = async (playlist) => {
  await pool.query("DELETE FROM playlists WHERE _id = ?", [playlist]);
};

const getAllPlaylistsSQL = async () => {
  const [rows] = await pool.query("SELECT * FROM playlists")

  return rows
}

const getAllPlaylistsTracksSQL = async () => {
  const [rows] = await pool.query("SELECT * FROM playlists_tracks")

  return rows
}


export {
  getAllPlaylistsTracksSQL,
  deletePlaylistSQL,
  deleteAllPlaylistsTracksSQL,
  getPlaylistSQL,
  getPlaylistByTitleSQL,
  createPlaylistSQL,
  getUserPlaylistsSQL,
  addTrackPlaylistSQL,
  getPlaylistTracksSQL,
  getPlaylistTrackByTitleSQL,
  deleteTrackPlaylistSQL,
  getAllPlaylistsSQL
};
