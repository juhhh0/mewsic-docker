import pool from "../database.js";

const getArtistsSQL = async (id) => {
  const [rows] = await pool.query(
    `
      SELECT DISTINCT name AS label FROM artists a
      INNER JOIN tracks t ON t.artist_id = a._id AND t.user_id = ?
    `,
    [id]
  );
  return rows;
};

const getArtistSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM artists WHERE _id = ?", [id]);
  return rows[0];
};

const getArtistByNameSQL = async (name) => {
  const [rows] = await pool.query("SELECT * FROM artists WHERE name = ?", [
    name,
  ]);
  return rows[0];
};

const searchArtistsByTitleSQL = async (query, id) => {
  const [rows] = await pool.query(
    `SELECT a.*
    FROM artists a  
    INNER JOIN tracks t ON a._id = t.artist_id AND t.user_id = ?
    WHERE a.name LIKE ?`,
    [id, query]
  );
  return rows;
};

const createArtistSQL = async (artist) => {
  const [result] = await pool.query("INSERT INTO artists (name) VALUES (?)", [
    artist,
  ]);

  const id = result.insertId;

  return getArtistSQL(id);
};

const createTrackArtistSQL = async (track_id, artist_id) => {
  await pool.query(
    "INSERT INTO tracks_artists (track_id, artist_id) VALUES (?, ?)",
    [track_id, artist_id]
  );
};

const getArtistIdByTrackIdSQL = async (track_id) => {
  const [rows] = await pool.query(
    "SELECT artist_id FROM tracks_artists WHERE track_id = ?",
    [track_id]
  );

  return rows[0].artist_id
}

const deleteArtistSQL = async (id) => {
  await pool.query(
    "DELETE FROM artists WHERE _id = ?", [id]
  )
}

const getAllArtistsSQL = async () => {
  const [rows] = await pool.query("SELECT _id, name FROM artists")

  return rows
}

const adminDeleteArtistSQL = async (id) => {

  await pool.query("UPDATE tracks SET artist_id = NULL WHERE artist_id = ?", [id])

  await pool.query("DELETE FROM artists WHERE _id = ?", [id])

  return album
}

export {
  adminDeleteArtistSQL,
  createArtistSQL,
  getArtistByNameSQL,
  createTrackArtistSQL,
  getArtistsSQL,
  getArtistIdByTrackIdSQL,
  deleteArtistSQL,
  getAllArtistsSQL,
searchArtistsByTitleSQL 
};
