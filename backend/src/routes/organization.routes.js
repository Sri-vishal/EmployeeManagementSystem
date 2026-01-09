const router = require('express').Router();
const ctrl = require('../controllers/organization.controller');

router.get('/', ctrl.getOrganizations); 
router.post('/', ctrl.createOrganization);

module.exports = router;
