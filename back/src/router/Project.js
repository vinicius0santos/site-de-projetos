const express = require('express');
const router = express.Router();
const Project = require('../controller/Project');

router.get('/get-all', Project.getAll);
router.get('/:slug', Project.getBySlug);
router.post('/create', Project.create);
router.delete('/delete', Project.delete);

module.exports = router;