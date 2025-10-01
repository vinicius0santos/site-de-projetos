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

        return url.data.publicUrl;
    },
    getAll: async () => {
        return await supabase
            .from('project')
            .select('*')
    },
    create: async (name, iconURL, imageName, createdBy, userId) => {
        return await supabase
            .from('project')
            .insert({ name: name, icon_url: iconURL, image_name: imageName, created_by: createdBy, user_id: userId })
            .select()
    }
}

module.exports = Project;