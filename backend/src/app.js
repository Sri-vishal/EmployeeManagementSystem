const express = require('express');
const cors = require('cors');

require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/organizations', require('./routes/organization.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'EMS Backend is running' });
});

module.exports = app;
