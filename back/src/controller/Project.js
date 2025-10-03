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
  const imgName = body.imgName;
  const userId = body.userId;
  const file = req.file;

  try{
    const img = file ? await Project.uploadImage(imgName, file.buffer) : {url: '', data: ''};
    const project = await Project.create(projectName, img.url, imgName, img.data, createdBy, userId);

    res.json({
      success: true,
      data: project.data
    });
  }
  catch(err){

  }
}

exports.delete = async (req, res) => {
  const paths = req.body.paths;
  const id = req.body.id;

  try{
    const project = await Project.delete(id);

    if(project.error) throw new Error('Não foi possível remover o projeto.');
    if(paths) p_img = await Project.removeImage(paths);

    res.json({
      success: true
    });
  }
  catch(err){
    console.log(err);

    res.json({
      success: true
    });
  }
}