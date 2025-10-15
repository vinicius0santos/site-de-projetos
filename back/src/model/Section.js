const supabase = require("../db");

const Section = {
  getSectionsAfter: async (now) => {
    return await supabase
      .from('section')
      .select('*')
      .gt('updated_at', new Date(now));
  },
  create: async (title, projectId) => {
    return await supabase
      .from('section')
      .insert({
        title: title,
        project_id: projectId,
        updated_at: new Date(Date.now())
      });
  },
  rename: async (sectionId, newTitle) => {
    return await supabase
      .from('section')
      .update({
        title: newTitle,
        updated_at: new Date(Date.now())
      })
      .eq('id', sectionId);
  },
  remove: async (sectionId) => {
    return await supabase
      .from('section')
      .update({
        is_deleted: true,
        updated_at: new Date(Date.now())
      })
      .eq('section_id', sectionId);
  },
  move: async (sectionId, nextItemOrder) => {
    const newOrder = new Date(new Date(nextItemOrder).getTime() - 1)

    return await supabase
      .from('section')
      .update({
        order: newOrder,
        updated_at: new Date(Date.now())
      })
      .eq('id', sectionId);
  }
}

module.exports = Section;
