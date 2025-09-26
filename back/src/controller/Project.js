const Project = require('../model/Project');

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json({
      success: true,
      data: projects}
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar projetos.'}
    );
  }
};
