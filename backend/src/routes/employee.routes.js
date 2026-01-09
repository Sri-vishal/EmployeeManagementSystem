const router = require('express').Router();
const ctrl = require('../controllers/employee.controller');

/* 🔍 Search & Filter */
router.get('/search', ctrl.searchEmployees);
router.get('/filter', ctrl.filterEmployees);

/* CRUD */
router.get('/', ctrl.getEmployees);
router.get('/deleted', ctrl.getDeletedEmployees);
router.post('/', ctrl.createEmployee);
router.put('/:id', ctrl.updateEmployee);
router.delete('/:id', ctrl.deleteEmployee);

module.exports = router;
