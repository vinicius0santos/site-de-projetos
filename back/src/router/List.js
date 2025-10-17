const express = require("express");
const router = express.Router();
const List = require("../controller/List");

router.get('/get-all/:sectionId', List.getAll);
router.get('/get-latest-lists/:sectionId/:lastListDate', List.getLatestLists);
router.post('/create', List.create);
router.put('/rename/:listId', List.rename);
router.put('/move/:listId', List.move);
router.delete('/delete/:listId', List.delete);

module.exports = router;
