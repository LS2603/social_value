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

router.get('/:code', async (req, res) => {
  try {
    const laCode = req.params.code;

    const laResult = await db.query(
      `SELECT id, la_district_code, la_district_name, imd_average_rank
       FROM local_authorities
       WHERE la_district_code = $1`,
      [laCode]
    );

    if (laResult.rows.length === 0) {
      return res.status(404).json({ error: 'Local authority not found' });
    }

    const la = laResult.rows[0];

    const domainsResult = await db.query(
      `SELECT d.name, r.rank
       FROM la_domain_ranks r
       JOIN domains d ON d.id = r.domain_id
       WHERE r.la_id = $1
       ORDER BY d.name`,
      [la.id]
    );

    res.json({
      la_district_code: la.la_district_code,
      la_district_name: la.la_district_name,
      imd_average_rank: la.imd_average_rank,
      domains: domainsResult.rows
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Database error' });
  }
});


module.exports = router;