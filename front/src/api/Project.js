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
        const token = localStorage.getItem('token') || '';

        try {
            const projects = await fetch(url, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            });

            return projects.json();
        }
        catch (err) {
            return { 
                success: false,
            }
        }
    }

    static async getBySlug(slug){
        const url = apiUrl + '/project/' + slug;

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })

            const project = await response.json()

            if(project.success){
                return project.data[0];
            }
            else throw new Error();
        }
        catch(err){
            return null
        }
    }

    static async delete(id, paths) {
        const url = apiUrl + "/project/delete";
        const body = JSON.stringify({
            id: id,
            paths: paths ? [
                JSON.parse(paths).path,
                JSON.parse(paths).fullPath,
            ] : undefined
        });

        try {
            const result = await fetch(url, {
                method: 'DELETE',
                headers: headers,
                body: body
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
