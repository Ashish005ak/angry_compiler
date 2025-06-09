const express = require('express');
const cors = require('cors');
const compileRoutes = require('./routes/compileRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON in requests

// API route
app.use('/api', compileRoutes);

module.exports = app;
