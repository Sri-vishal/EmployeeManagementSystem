const db = require('../config/db');

exports.getOrganizations = (req, res) => {
  db.query('SELECT * FROM organizations', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createOrganization = (req, res) => {
  const { name, industry, description } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Organization name is required' });
  }

  db.query(
    'INSERT INTO organizations (name, industry, description) VALUES (?, ?, ?)',
    [name, industry, description],
    err => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Organization created' });
    }
  );
};
