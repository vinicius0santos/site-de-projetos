const Project = require('../model/Project');

exports.getAll = (req, res) => {
  try {
    const projects = Project.getAll();

    res.json({
      success: true,
      data: projects
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

exports.create = (req, res) => {
  const body = JSON.parse(req.body.project);
  const name = body.name;
  const slug = body.slug;
  const userId = body.userId;
  const buffer = req?.file?.buffer || null;

  try {
    if (name.trim() == '' || slug.trim() == '' || !userId) {
      throw new Error("Campos inválidos");
    }

    const project = Project.create(name, slug, buffer, userId);

    res.json({
      success: true,
      data: project
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, });
  }
}

exports.delete = (req, res) => {
  const id = req.params.id;

  try {
    Project.delete(id);

    res.json({
      success: true
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}

exports.getBySlug = (req, res) => {
  const slug = req.params.slug;

  try {
    const project = Project.getBySlug(slug);

    if(!project) throw new Error('Projeto não encontrado');

    res.json({
      success: true,
      data: project
    });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false })
  }
}