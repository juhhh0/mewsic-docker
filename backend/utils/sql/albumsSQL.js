import pool from "../database.js";

const getAlbumsSQL = async (id) => {
  const [rows] = await pool.query(
    `
      SELECT a.title AS label, a.cover AS cover, ar.name AS artist FROM albums a
      INNER JOIN tracks t ON t.album_id = a._id
      LEFT JOIN artists ar ON ar._id = t.artist_id
      INNER JOIN users_tracks ut ON ut.track_id = t._id AND ut.user_id = ?
      GROUP BY a.title, a.cover, ar.name
    `,

    [id]
  );
  return rows;
};

const getAlbumSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM albums WHERE _id = ?", [id]);

  return rows[0];
};

const getAlbumByNameSQL = async (album) => {
  const [rows] = await pool.query("SELECT * FROM albums WHERE title = ?", [
    album,
  ]);
  return rows[0];
};

const createAlbumSQL = async (album, url, cloudinary_id ) => {
  const [result] = await pool.query("INSERT INTO albums (title, cover, cover_cloudinary_id) VALUES (?, ?, ?)", [
    album,
    url,
    cloudinary_id
  ]);

  const id = result.insertId;

  return getAlbumSQL(id);
};

const getAlbumIdByTrackIdSQL = async (track_id) => {
  const [rows] = await pool.query(
    "SELECT album_id FROM tracks_albums WHERE track_id = ?",
    [track_id]
  );

  return rows[0].album_id
}

const deleteAlbumSQL = async (id) => {
  await pool.query(
    "DELETE FROM albums WHERE _id = ?", [id]
  )
}

const getAllAlbumsSQL = async () => {
  const [rows] = await pool.query("SELECT _id, title, cover FROM albums")

  return rows
}

const adminDeleteAlbumSQL = async (id) => {
  const album = await getAlbumSQL(id)

  await pool.query("UPDATE tracks SET album_id = NULL WHERE album_id = ?", [id])

  await pool.query("DELETE FROM albums WHERE _id = ?", [id])

  return album
}

export { adminDeleteAlbumSQL, getAlbumSQL, createAlbumSQL, getAlbumByNameSQL, getAlbumsSQL, getAlbumIdByTrackIdSQL, deleteAlbumSQL, getAllAlbumsSQL };
