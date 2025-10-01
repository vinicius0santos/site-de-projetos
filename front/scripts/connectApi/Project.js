import { apiUrl, headers } from "../../global.js";

class Project {
    constructor(projectName, createdBy, userId, imageName, blob) {
        this.data = {
            projectName: projectName,
            createdBy: createdBy,
            userId: userId,
            imageName: imageName,
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
