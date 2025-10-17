const List = require('../model/List');

exports.getAll = (req, res) => {
  const sectionId = req.params.sectionId

  try {
    const lists = List.getAll(sectionId);

    res.json({ data: lists, success: true });
  }
  catch (err) {
    console.error(err.message);
    res.json({ data: [], success: false });
  }
};

exports.create = (req, res) => {
  const title = req.body.title;
  const sectionId = req.body.sectionId;

  try {
    if (title.trim() != '' && sectionId) {
      List.create(title, sectionId);

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
  const listId = req.params.listId;
  const newTitle = req.body.newTitle;

  try {
    if (newTitle.trim() != '' && listId) {
      List.rename(listId, newTitle);

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
  const listId = req.params.listId;

  try {
    if (listId) {
      List.delete(listId);

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
  const listId = req.params.listId;
  const nextItemOrder = req.body.nextItemOrder;

  try {
    if (listId) {
      List.move(listId, nextItemOrder);

      res.json({ success: true });
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err.message);
    res.json({ success: false });
  }
}

exports.getLatestLists = (req, res) => {
  const sectionId = req.params.sectionId
  const lastListDate = req.params.lastListDate;

  try {
    if (lastListDate) {
      const sections = List.getLatestLists(lastSectionDate, sectionId);

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
