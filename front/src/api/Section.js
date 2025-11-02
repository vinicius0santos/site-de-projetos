import { apiUrl, headers } from "../global.js";

class Section {
    static async getAll(projectId) {
        const url = apiUrl + '/section/get-all/' + projectId;

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

    static async getLatestSections(projectId, lastSectionDate) {
        const url = apiUrl + `/section/get-latest-sections/${projectId}/${lastSectionDate}`;

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

    static async create(title, projectId, createdBy) {
        const url = apiUrl + '/section/create';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ title: title, projectId: projectId, createdBy: createdBy }),
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
        const url = apiUrl + '/section/rename/' + sectionId;

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
        const url = apiUrl + '/section/move/' + sectionId;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({ nextItemOrder: nextItemOrder }),
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
        const url = apiUrl + '/section/delete/' + sectionId;

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
