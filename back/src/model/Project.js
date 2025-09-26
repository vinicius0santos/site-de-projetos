const supabase = require("../db");

const Project = {
  getAll: async () => {
    return [
      {id: 'project1', title: 'Jogo de Investigação'},
      {id: 'project2', title: 'Hill Valley'},
      {id: 'project3', title: 'PixyBox'},
    ];
  },
}

module.exports = Project;