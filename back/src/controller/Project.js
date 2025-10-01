const Project = require('../model/Project');

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.getAll();

    res.json({
      success: true,
      data: projects.data
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Erro ao buscar projetos.'
    });
  }
};

exports.create = async (req, res) => {
  const body = JSON.parse(req.body.project);
  const projectName = body.projectName;
  const createdBy = body.createdBy;
  const imageName = body.imageName;
  const userId = body.userId;
  const file = req.file;

  try{
    const imageURL = file ? await Project.uploadImage(imageName, file.buffer) : '';
    const project = await Project.create(projectName, imageURL, imageName, createdBy, userId);

    res.json({
      success: true,
      data: project.data
    });
  }
  catch(err){

  }
}