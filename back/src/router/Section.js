const express = require("express");
const router = express.Router();
const Section = require("../controller/Section");

router.get('/get-sections-after/:now', Section.getSectionsAfter);
router.post('/create', Section.create);
router.put('/rename/:sectionId', Section.rename);
router.put('/remove/:sectionId', Section.remove);
router.put('/move/:sectionId', Section.move);

module.exports = router;
