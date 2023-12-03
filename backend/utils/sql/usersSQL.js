import pool from "../database.js";

const getUserSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE _id = ?", [id]);
  return rows[0];
};

const getUserByEmailSQL = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
};

const getUserByPseudoSQL = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE pseudo = ?", [
    email,
  ]);

  return rows[0];
};

const createUserSQL = async (email, password, verifToken, pseudo) => {
  const [result] = await pool.query(
    "INSERT INTO users (email, password, verif_token, pseudo) VALUES (?, ?, ?, ?)",
    [email, password, verifToken, pseudo]
  );

  const id = result.insertId;

  return getUserSQL(id);
};

const verifyUserSQL = async (id) => {
  await pool.query("UPDATE users SET verified = true WHERE _id = ?", [id]);

  return getUserSQL(id);
};

const updatePasswordSQL = async (id, password) => {
  await pool.query("UPDATE users SET password = ? WHERE _id = ?", [
    password,
    id,
  ]);

  return getUserSQL(id);
};

const getVerifTokenSQL = async (id) => {
  const [rows] = await pool.query(
    "SELECT verif_token FROM users WHERE _id = ?",
    [id]
  );

  return rows[0];
};

const createVerifTokenSQL = async (id, token) => {
  const now = Date.now();
  await pool.query(
    "UPDATE users SET verif_token = ?, verif_token_created_at = ? WHERE _id = ?",
    [token, now, id]
  );
};

const deleteVerificationTokenSQL = async (id) => {
  await pool.query(
    "UPDATE users SET verif_token = NULL AND verif_token_created_at = NULL WHERE _id = ?",
    [id]
  );
};

const getResetTokenSQL = async (id) => {
  const [rows] = await pool.query(
    "SELECT reset_token FROM users WHERE _id = ?",
    [id]
  );

  return rows[0];
};

const createResetTokenSQL = async (id, token) => {
  const now = Date.now();
  await pool.query(
    "UPDATE users SET reset_token = ?, reset_token_created_at = ? WHERE _id = ?",
    [token, now, id]
  );
};

const deleteResetTokenSQL = async (id) => {
  await pool.query(
    "UPDATE users SET reset_token = NULL, reset_token_created_at = NULL WHERE _id = ?",
    [id]
  );
};

const getProfileSQL = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT email,avatar, pseudo, _id FROM users  WHERE _id = ?
  `,
    [id]
  );

  return rows[0];
};

const getAllUsersSQL = async () => {
  const [rows] = await pool.query(
    "SELECT _id, email, role, verified,avatar, pseudo FROM users"
  );

  return rows;
};

const searchUsersByPseudoSQL = async (query) => {
  const [rows] = await pool.query(
    `SELECT pseudo, _id, avatar FROM users WHERE pseudo LIKE ?`,
    [query]
  );

  return rows;
};

const updatePseudoSQL = async (pseudo, id) => {
  await pool.query("UPDATE users SET pseudo = ? WHERE _id = ?", [pseudo, id]);
};

const updateAvatarSQL = async (avatar, avatar_id, id) => {
  await pool.query(
    "UPDATE users SET avatar = ?, avatar_cloudinary_id = ? WHERE _id = ?",
    [avatar, avatar_id, id]
  );
};

const getUserAvatarIdSQL = async (id) => {
  const [rows] = await pool.query(
    "SELECT avatar_cloudinary_id FROM users WHERE _id = ?",
    [id]
  );

  return rows[0].avatar_cloudinary_id;
};

const adminDeleteUserSQL = async (id) => {

  const [rows] = await pool.query("SELECT cover_cloudinary_id, audio_cloudinary_id FROM tracks WHERE user_id = ?", [id])
  await pool.query(
    `
    DELETE FROM playlists_tracks WHERE playlist_id IN (
      SELECT _id FROM playlists WHERE user_id = ?
    )
    `,
    [id]
  );

  await pool.query("DELETE FROM playlists WHERE user_id = ?", [id]);

  await pool.query("DELETE FROM tracks WHERE user_id = ?", [id]);
  await pool.query("DELETE FROM users WHERE _id = ?", [id]);

  return rows
};

export {
  adminDeleteUserSQL,
  searchUsersByPseudoSQL,
  createUserSQL,
  getUserAvatarIdSQL,
  updatePseudoSQL,
  updateAvatarSQL,
  getUserByEmailSQL,
  getUserByPseudoSQL,
  getUserSQL,
  verifyUserSQL,
  updatePasswordSQL,
  getVerifTokenSQL,
  createVerifTokenSQL,
  deleteVerificationTokenSQL,
  getResetTokenSQL,
  createResetTokenSQL,
  deleteResetTokenSQL,
  getProfileSQL,
  getAllUsersSQL,
};
