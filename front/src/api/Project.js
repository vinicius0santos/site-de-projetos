import { apiUrl, headers } from '../global';

class Project {
    constructor(projectName, createdBy, userId, imgName, blob) {
        this.data = {
            projectName: projectName,
            createdBy: createdBy,
            userId: userId,
            imgName: imgName,
            blob: blob
        }
    }

    static async getAll() {
        const url = apiUrl + '/project/get-all';
        const token = localStorage.getItem('token') || '';

        const projects = await fetch(url, {
            method: 'GET',
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });

        return projects.json();
    }

    static async delete(id, paths){
        console.log(paths)
        const url = apiUrl + "/project/delete";
        const body = JSON.stringify({
            id: id,
            paths: paths ? [
                JSON.parse(paths).path,
                JSON.parse(paths).fullPath,
            ] : undefined
        });

        const result = await fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: body
        })

        return result.json();
    }

    async create() {
        const url = apiUrl + '/project/create';
        const formData = new FormData;
        console.log(this.data)
        if(this.data.blob){
            formData.append('file', this.data.blob, 'img.webp');
        }
        formData.append('project', JSON.stringify(this.data))

        const projects = await fetch(url, {
            method: 'POST',
            body: formData,
        })
        
        return projects.json();
    }
}

export default Project;
