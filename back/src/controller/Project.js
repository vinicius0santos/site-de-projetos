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
  const name = body.name;
  const slug = body.slug;
  const userId = body.userId;
  const buffer = req.file?.buffer || undefined;

  try{
    if(!name || !slug || !userId) throw new Error("Campos inválidos");

    const img = await Project.uploadImage(name, buffer);
    const project = await Project.create(name, slug, img?.url, img?.data, userId);

    res.json({
      success: true,
      data: project.data
    });
  }
  catch(err){
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Erro ao criar o projeto'
    });
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
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Falha ao deletar o projeto'
    });
  }
}

exports.getBySlug = async (req, res) => {
  const slug = req.params.slug;
  
  try{
    const project = await Project.getBySlug(slug);

    console.log(project.data);

    res.json({
      success: true,
      data: project.data
    });
  }
  catch(err){
    console.log(err.message);
    res.json({
      success: false,
      message: 'Falha ao encontrar o projeto'
    })
  }
}