const supabase = require("../db");

const Project = {
    uploadImage: async (fileName, buffer) => {
        const { data, error } = (await supabase.storage
            .from('projects icon')
            .upload(fileName + '.webp', buffer, {
                contentType: 'image/webp',
                upsert: true
            })
        );

        if (error) throw new Error(error.message);

        const url = supabase.storage
            .from('projects icon')
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

    getById: async(id) => {
        return await supabase
            .from('project')
            .select('*')
            .eq('id', id)
            .single()
    },

    getAll: async () => {
        return await supabase
            .from('project')
            .select('*')
    },

    create: async (name, iconURL, imgName, iconPaths, createdBy, userId) => {
        return await supabase
            .from('project')
            .insert({ 
                name: name, 
                icon_url: iconURL, 
                img_name: imgName, 
                icon_paths: iconPaths  || '', 
                created_by: createdBy, 
                user_id: userId 
            })
            .select()
    },

    delete: async (id) => {
        return await supabase
            .from('project')
            .delete()
            .eq('id', id)
    }
}

module.exports = Project;