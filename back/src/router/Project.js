const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Project = require('../controller/Project');

router.get('/get-all', authenticateToken, Project.getAll);
router.post('/create', Project.create);
router.delete('/delete', Project.delete);

module.exports = router;