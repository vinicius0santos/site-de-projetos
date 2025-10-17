import { apiUrl, headers } from "../global.js";
import { slugify } from '../utils/slugify.js';

class Project {
    constructor(name, userId, file = undefined) {
        this.data = {
            name: name,
            slug: slugify(name),
            userId: userId,
            file: file
        }
    }

    static async getAll() {
        const url = apiUrl + '/project/get-all';

        try {
            const projects = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });

            return (await projects.json()).data;
        }
        catch (err) {
            return []
        }
    }

    static async getBySlug(slug){
        const url = apiUrl + '/project/' + slug;

        try{
            const project = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            })

            return (await project.json()).data;
        }
        catch(err){
            return null
        }
    }

    static async delete(id) {
        const url = apiUrl + "/project/delete/"+id;

        try {
            const result = await fetch(url, {
                method: 'DELETE',
                headers: headers,
                credentials: 'include'
            })

            return result.json();
        }
        catch (err) {
            return { 
                success: false,
            }
        }
    }

    async create() {
        const url = apiUrl + '/project/create';
        const formData = new FormData;

        try {
            if (this.data.file) {
                formData.append('file', this.data.file, 'img.webp');
            }
            formData.append('project', JSON.stringify(this.data))

            const projects = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            return projects.json();
        }
        catch (err) {
            return { 
                success: false,
            }
        }
    }
}

export default Project;
