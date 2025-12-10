const express = require('express');
const router = express.Router();
const db = require ('../db')

router.get('/', async (req, res) => {
    try {
    const { rows } = await db.query(
      `SELECT * FROM local_authorities ORDER BY imd_average_rank LIMIT 10;`
    );
    res.json(rows);
    console.log('Top 10 LA names:', rows.map(r => r.la_district_name));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;