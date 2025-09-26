const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Project = require('../controller/Project');

router.get('/', authenticateToken, Project.getAll);

module.exports = router;