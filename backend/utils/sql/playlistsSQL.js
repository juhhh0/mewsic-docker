import pool from "../database.js";

const getUserPlaylistsSQL = async (user) => {
  const [rows] = await pool.query("SELECT * FROM playlists WHERE user_id = ?", [
    user,
  ]);

  return rows;
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

export { getPlaylistSQL, createPlaylistSQL, getUserPlaylistsSQL };
