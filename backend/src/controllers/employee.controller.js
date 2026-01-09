const db = require('../config/db');

// Backend Validations
function validateEmployee(data, isUpdate = false) {
  const errors = [];

  // Full name
  if (!isUpdate || data.full_name !== undefined) {
    if (!data.full_name || data.full_name.trim().length < 2) {
      errors.push('Full name is required and must be at least 2 characters');
    } else if (!/^[A-Za-z ]+$/.test(data.full_name)) {
      errors.push('Name must contain only letters and spaces');
    }
  }

  // Email
  if (!isUpdate || data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  // Phone
  if (!isUpdate || data.phone !== undefined) {
    if (!/^\d{10}$/.test(data.phone)) {
      errors.push('Phone number must be 10 digits');
    }
  }

  // Salary
  if (data.salary !== undefined && data.salary !== '') {
    if (Number(data.salary) <= 0) {
      errors.push('Salary must be a positive number');
    }
  }

  return errors;
}

exports.getEmployees = (req, res) => {
  db.query(
    `SELECT e.*, o.name AS organization
     FROM employees e
     JOIN organizations o ON e.organization_id = o.id
     WHERE e.is_deleted = false`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getDeletedEmployees = (req, res) => {
  db.query(
    `SELECT e.*, o.name AS organization
     FROM employees e
     JOIN organizations o ON e.organization_id = o.id
     WHERE e.is_deleted = true`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.createEmployee = (req, res) => {
  const data = req.body;

  // Sanitize
  delete data.organization;

  // Validate
  const errors = validateEmployee(data);
  if (errors.length) {
    return res.status(400).json({ message: errors[0] });
  }

  db.query('INSERT INTO employees SET ?', data, err => {
    if (err) {
      console.error('CREATE EMPLOYEE ERROR:', err);

      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }

      return res
        .status(500)
        .json({ message: 'Failed to create employee' });
    }

    res.status(201).json({ message: 'Employee created successfully' });
  });
};

exports.updateEmployee = (req, res) => {
  const data = req.body;

  // Sanitize
  delete data.organization;

  // Validate (partial allowed)
  const errors = validateEmployee(data, true);
  if (errors.length) {
    return res.status(400).json({ message: errors[0] });
  }

  db.query(
    'UPDATE employees SET ? WHERE id = ?',
    [data, req.params.id],
    (err, result) => {
      if (err) {
        console.error('UPDATE EMPLOYEE ERROR:', err);

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }

        return res
          .status(500)
          .json({ message: 'Failed to update employee' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ message: 'Employee updated successfully' });
    }
  );
};

exports.deleteEmployee = (req, res) => {
  db.query(
    'UPDATE employees SET is_deleted = true WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ message: 'Employee deleted' });
    }
  );
};

/* ================= SEARCH ================= */

exports.searchEmployees = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  const sql = `
    SELECT e.*, o.name AS organization
    FROM employees e
    JOIN organizations o ON e.organization_id = o.id
    WHERE e.is_deleted = false
      AND (
        e.full_name LIKE ?
        OR e.email LIKE ?
        OR e.position LIKE ?
        OR e.department LIKE ?
      )
  `;

  const value = `%${query}%`;

  db.query(sql, [value, value, value, value], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


/* ================= FILTER ================= */
exports.filterEmployees = (req, res) => {
  const { org, dept, status } = req.query;

  let sql = `
    SELECT e.*, o.name AS organization
    FROM employees e
    JOIN organizations o ON e.organization_id = o.id
    WHERE e.is_deleted = false
  `;

  const params = [];

  // 🏢 Filter by organization
  if (org) {
    sql += ' AND o.name = ?';
    params.push(org);
  }

  // 🏷️ Filter by department
  if (dept) {
  sql += ' AND LOWER(e.department) LIKE ?';
  params.push(`%${dept.toLowerCase()}%`);
}

  // 🚦 Filter by status
  if (status) {
    sql += ' AND e.status = ?';
    params.push(status);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};