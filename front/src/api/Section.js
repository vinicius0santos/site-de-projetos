import { apiUrl, headers } from "../global.js";

class Section {
    static async getAll(){
        const url = apiUrl + '/section/get-all/';
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
    
            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { data: [], success: false };
        }
    }

    static async getLatestSections(lastSectionDate){
        const url = apiUrl + '/section/get-latest-sections/'+(new Date(lastSectionDate).getTime());
    
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
    
            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { data: [], success: false };
        }
    }

    static async create(title, projectId) {
        const url = apiUrl + '/section/create';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ title: title, projectId: projectId }),
                headers: headers
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
                headers: headers
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
                headers: headers
            });

            return (await response.json());
        }
        catch (err) {
            console.log(err.message);
            return { success: false };
        }
    }

    static async remove(sectionId) {
        const url = apiUrl + '/section/remove/'+sectionId;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers
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
