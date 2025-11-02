import { apiUrl, headers } from "../global.js";

class List {
    static async getAll(listId){
        const url = apiUrl + '/list/get-all/'+listId;
    
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

    static async getLatestLists(sectionId, lastListDate){
        const url = apiUrl + `/list/get-latest-lists/${sectionId}/${lastListDate}`;
    
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

    static async create(title, sectionId, createdBy) {
        const url = apiUrl + '/list/create';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ title: title, sectionId: sectionId, createdBy: createdBy }),
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

    static async rename(listId, newTitle) {
        const url = apiUrl + '/list/rename/'+listId;

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

    static async move(listId, nextItemOrder) {
        const url = apiUrl + '/list/move/'+listId;

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

    static async delete(listId) {
        const url = apiUrl + '/list/delete/'+listId;

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

export default List;
