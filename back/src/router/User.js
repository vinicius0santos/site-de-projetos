const express = require('express');
const router = express.Router();
const User = require('../controller/User');

router.post('/create', User.insert);
router.post('/login', User.login);

module.exports = router;