const supabase = require("../db");

const Section = {
  getAll: async () => {
    return await supabase
      .from('section')
      .select('*');
  },
  getLatestSections: async (lastSectionDate) => {
    return await supabase
      .from('section')
      .select('*')
      .gt('updated_at', new Date(Number(lastSectionDate)).toISOString());
  },
  create: async (title, projectId) => {
    return await supabase
      .from('section')
      .insert({
        title: title,
        project_id: projectId,
        updated_at: new Date().toISOString()
      });
  },
  rename: async (sectionId, newTitle) => {
    return await supabase
      .from('section')
      .update({
        title: newTitle,
        updated_at: new Date().toISOString()
      })
      .eq('id', sectionId);
  },
  remove: async (sectionId) => {
    return await supabase
      .from('section')
      .update({
        is_deleted: true,
        updated_at: new Date()
      })
      .eq('section_id', sectionId);
  },
  move: async (sectionId, nextItemOrder) => {
    const newOrder = new Date(new Date(nextItemOrder).getTime() - 1).toISOString()

    return await supabase
      .from('section')
      .update({
        order: newOrder,
        updated_at: new Date().toISOString()
      })
      .eq('id', sectionId);
  }
}

module.exports = Section;
