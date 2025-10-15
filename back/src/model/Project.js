const supabase = require("../db");

const Project = {
    uploadImage: async (name, buffer) => {
        if(!buffer) return;

        const { data, error } = (await supabase.storage
            .from('projects_icon')
            .upload(name + '.webp', buffer, {
                contentType: 'image/webp',
                upsert: true
            })
        );

        if (error) throw new Error(error.message);

        const url = supabase.storage
            .from('projects_icon')
            .getPublicUrl(data.path);

        return {
            url:url.data.publicUrl,
            data: data
        };
    },

    removeImage: async (paths) => {
        return await supabase.storage
            .from('projects icon')
            .remove(paths);
    },

    getAll: async () => {
        return await supabase
            .from('project')
            .select('*')
    },

    create: async (name, slug, iconURL, iconPaths, userId) => {
        return await supabase
            .from('project')
            .insert({
                name: name, 
                slug: slug,
                icon_url: iconURL,
                icon_paths: iconPaths, 
                user_id: userId 
            })
            .select()
    },

    delete: async (id) => {
        return await supabase
            .from('project')
            .delete()
            .eq('id', id)
    },

    getBySlug: async (slug) => {
        return await supabase
            .from('project')
            .select()
            .eq('slug', slug)
    } 
}

module.exports = Project;