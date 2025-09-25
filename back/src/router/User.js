const express = require("express");
const router = express.Router();
const User = require('../controller/User');
const Model = require('../model/User')
const hashcode = require("../lib/hashcode")

router.post('/create', User.insert);
router.post('/login', User.login);

module.exports = router;