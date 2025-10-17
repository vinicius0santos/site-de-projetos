const Section = require('../model/Section');

exports.getAll = (req, res) => {
  try {
    const sections = Section.getAll();

    res.json({ data: sections, success: true });
  }
  catch (err) {
    console.error(err.message);
    res.json({ data: [], success: false });
  }
};

exports.create = (req, res) => {
  const title = req.body.title;
  const projectId = req.body.projectId;

  try {
    if (title.trim() != '' && projectId) {
      Section.create(title, projectId);

      res.json({ success: true });
    }
    else throw new Error('Campos inválidos');
  }
  catch (err) {
    console.error(err.message);
    res.json({ success: false });
  }
};

exports.rename = (req, res) => {
  const sectionId = req.params.sectionId;
  const newTitle = req.body.newTitle;

  try {
    if (newTitle.trim() != '' && sectionId) {
      Section.rename(sectionId, newTitle);

      res.json({ success: true });
    }
    else throw new Error('Campos inválidos');
  }
  catch (err) {
    console.error(err.message);
    res.json({ success: false });
  }
}

exports.delete = (req, res) => {
  const sectionId = req.params.sectionId;

  try {
    if (sectionId) {
      Section.delete(sectionId);

      res.json({ success: true });
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err.message);
    res.json({ success: false });
  }
}

exports.move = (req, res) => {
  const sectionId = req.params.sectionId;
  const nextItemOrder = req.body.nextItemOrder;

  try {
    if (sectionId) {
      Section.move(sectionId, nextItemOrder);

      res.json({ success: true });
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err.message);
    res.json({ success: false });
  }
}

exports.getLatestSections = (req, res) => {
  const lastSectionDate = req.params.lastSectionDate;

  try {
    if (lastSectionDate) {
      const sections = Section.getLatestSections(lastSectionDate);

      res.json({
        data: sections,
        success: true
      });
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err.message);
    res.json({
      data: [],
      success: false
    });
  }
}
