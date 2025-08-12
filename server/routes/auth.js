const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/signup", async (req, res) => {
  try {
    const {
      first_name, last_name, email, password, phone,
      role = "mentee", bio, linkedin_url, image_url,
      coding_languages, specialty_fields
    } = req.body;

    const password_hash = password ? await bcrypt.hash(password, 12) : null;

    const cols = [
      "first_name","last_name","email","password_hash","phone","role",
      "bio","linkedin_url","image_url","coding_languages","specialty_fields"
    ];
    const ph = cols.map((_, i) => `$${i + 1}`).join(",");
    const sql = `insert into public.users (${cols.join(",")}) values (${ph}) returning id,email,role,first_name,last_name`;

    const { rows } = await db.query(sql, [
      first_name, last_name, email, password_hash, phone || null, role,
      bio || null, linkedin_url || null, image_url || null,
      coding_languages || null, specialty_fields || null
    ]);

    const user = rows[0];
    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user, token });
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Email already exists" });
    if (e.code === "23514") return res.status(400).json({ error: "Invalid role" });
    res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await db.query("select id,email,role,first_name,last_name,password_hash from public.users where email = $1", [email]);
  const user = rows[0];
  if (!user || !user.password_hash) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ user: { id: user.id, email: user.email, role: user.role, first_name: user.first_name, last_name: user.last_name }, token });
});

const { authenticateToken } = require("../middleware/auth");

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, email, role, first_name, last_name, phone, bio, linkedin_url, image_url, coding_languages, specialty_fields, created_at FROM public.users WHERE id = $1",
      [req.user.sub]
    );
    
    if (!rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
