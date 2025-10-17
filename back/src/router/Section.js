const express = require("express");
const router = express.Router();
const Section = require("../controller/Section");

router.get('/get-all/:projectId', Section.getAll);
router.get('/get-latest-sections/:projectId/:lastSectionDate', Section.getLatestSections);
router.post('/create', Section.create);
router.put('/rename/:sectionId', Section.rename);
router.put('/move/:sectionId', Section.move);
router.delete('/delete/:sectionId', Section.delete);

module.exports = router;
