require('dotenv').config();
const express = require('express');
const cors = require('cors');
const healthRoute = require('./routes/health');
const localAuthoritiesRoute = require('./routes/localAuthorities')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', healthRoute);
app.use('/api/local-authorities', localAuthoritiesRoute);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
