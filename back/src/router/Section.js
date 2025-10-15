const express = require("express");
const router = express.Router();
const Section = require("../controller/Section");

router.get('/get-all', Section.getAll);
router.get('/get-latest-sections/:now', Section.getSectionsAfter);
router.post('/create', Section.create);
router.put('/rename/:sectionId', Section.rename);
router.put('/move/:sectionId', Section.move);
router.delete('/remove/:sectionId', Section.remove);

module.exports = router;
