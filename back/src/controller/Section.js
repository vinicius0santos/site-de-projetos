const Section = require('../model/Section');

exports.getAll = async (req, res) => {
  try {
    const response = await Section.getAll();

    if (!response.error) {
      res.json({ data: response.data, success: true });
    }
    else throw new Error('Erro ao criar uma section');
  }
  catch (err) {
    console.error(err);
    res.json({ data: [], success: false });
  }
};

exports.create = async (req, res) => {
  const title = req.body.title;
  const projectId = req.body.projectId;

  try {
    if (title.trim() != '' && projectId) {
      const response = await Section.create(title, projectId);

      if (!response.error) {
        res.json({ success: true });
      }
      else throw new Error('Erro ao criar uma section');
    }
    else throw new Error('Campos inválidos');
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
};

exports.rename = async (req, res) => {
  const sectionId = req.params.sectionId;
  const newTitle = req.body.newTitle;

  try {
    if (newName.trim() != '' && sectionId) {
      const response = await Section.rename(sectionId, newTitle);

      if (!response.error) {
        res.json({ success: true });
      }
      else throw new Error('Erro ao editar uma section');
    }
    else throw new Error('Campos inválidos');
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

exports.remove = async (req, res) => {
  const sectionId = req.params.sectionId;

  try {
    if (sectionId) {
      const response = await Section.remove(sectionId);

      if (!response.error) {
        res.json({ success: true });
      }
      else throw new Error('Erro ao remover uma section');
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

exports.move = async (req, res) => {
  const sectionId = req.params.sectionId;
  const nextItemOrder = req.body.nextItemOrder;

  try {
    if (sectionId) {
      const response = await Section.move(sectionId, nextItemOrder);

      if (!response.error) {
        res.json({ success: true });
      }
      else throw new Error('Erro ao mover uma section');
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

exports.getLatestSections = async (req, res) => {
  const lastSectionDate = req.params.lastSectionDate;

  try {
    if (lastSectionDate) {
      const response = await Section.getLatestSections(lastSectionDate);

      if (!response.error) {
        res.json({
          data: response.data,
          success: true
        });
      }
      else throw new Error('Erro ao obter sections');
    }
    else throw new Error();
  }
  catch (err) {
    console.error(err);
    res.json({
      data: [],
      success: false
    });
  }
}
