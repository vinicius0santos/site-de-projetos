const express = require("express");
const router = express.Router();
const Comment = require('../controller/Comment');

router.post('/post', Comment.post);
router.post('/getLatestComments', Comment.getLatestComments);
router.get('/getLatest50', Comment.getLatest50);

module.exports = router;