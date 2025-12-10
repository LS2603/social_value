require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/local-authorities/test', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT la_district_name AS District FROM local_authorities;`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
