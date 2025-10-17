import { apiUrl, headers } from "../global.js";

class Section {
    static async getAll(){
        const url = apiUrl + '/section/get-all/';
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });
    
            return (await response.json()).data;
        }
        catch (err) {
            console.log(err.message);
            return [];
        }
    }

    static async getLatestSections(lastSectionDate){
        const url = apiUrl + '/section/get-latest-sections/'+lastSectionDate;
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });
    
            return (await response.json()).data;
        }
        catch (err) {
            console.log(err.message);
            return [];
        }
    }

    static async create(title, projectId) {
        const url = apiUrl + '/section/create';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ title: title, projectId: projectId }),
                headers: headers,
                credentials: 'include'
            });

            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { success: false };
        }
    }

    static async rename(sectionId, newTitle) {
        const url = apiUrl + '/section/rename/'+sectionId;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({ newTitle: newTitle }),
                headers: headers,
                credentials: 'include'
            });

            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { success: false };
        }
    }

    static async move(sectionId, nextItemOrder) {
        const url = apiUrl + '/section/move/'+sectionId;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({nextItemOrder: nextItemOrder}),
                headers: headers,
                credentials: 'include'
            });

            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { success: false };
        }
    }

    static async delete(sectionId) {
        const url = apiUrl + '/section/delete/'+sectionId;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers,
                credentials: 'include'
            });

            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { success: false };
        }
    }

}

export default Section;
