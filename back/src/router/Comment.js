const express = require("express");
const router = express.Router();
const Comment = require('../controller/Comment');

router.post('/post', Comment.post);
router.post('/getLatestComments', Comment.getLatestComments);

module.exports = router;