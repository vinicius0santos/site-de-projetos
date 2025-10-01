const express = require("express");
const router = express.Router();
const Comment = require('../controller/Comment');

router.post('/post', Comment.post);
router.post('/get-latest-comments', Comment.getLatestComments);
router.get('/get-latest50', Comment.getLatest50);

module.exports = router;