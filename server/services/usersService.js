const db = require("../config/db");

async function getAllUsers(limit = 100) {
  const { rows } = await db.query(
    "SELECT * FROM public.users ORDER BY created_at DESC LIMIT $1",
    [limit]
  );
  return rows;
}

async function getUserById(id) {
  const { rows } = await db.query(
    "SELECT * FROM public.users WHERE id = $1",
    [id]
  );
  return rows[0];
}

async function getMentors() {
  const { rows } = await db.query(
    "SELECT * FROM public.users WHERE role = 'mentor' ORDER BY created_at DESC"
  );
  return rows;
}

async function getMentees() {
  const { rows } = await db.query(
    "SELECT * FROM public.users WHERE role = 'mentee' ORDER BY created_at DESC"
  );
  return rows;
}

async function createUser(userData) {
  const cols = [
    "first_name", "last_name", "email", "password_hash", "phone",
    "role", "bio", "linkedin_url", "image_url", "coding_languages", "specialty_fields"
  ];
  const ph = cols.map((_, i) => `$${i + 1}`).join(",");
  const sql = `INSERT INTO public.users (${cols.join(",")}) VALUES (${ph}) RETURNING id`;
  
  const { rows } = await db.query(sql, cols.map(col => userData[col]));
  return rows[0];
}

async function updateUser(id, userData) {
  const keys = Object.keys(userData).filter(key => userData[key] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  
  const sets = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const sql = `UPDATE public.users SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`;
  const params = [...keys.map(key => userData[key]), id];
  
  const { rows } = await db.query(sql, params);
  return rows[0];
}

async function deleteUser(id) {
  const { rowCount } = await db.query(
    "DELETE FROM public.users WHERE id = $1",
    [id]
  );
  return rowCount > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  getMentors,
  getMentees,
  createUser,
  updateUser,
  deleteUser
};

