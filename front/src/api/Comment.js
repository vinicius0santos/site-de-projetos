import { apiUrl, headers } from "../global.js";

class Comment {
    static async post(message) {
        const url = apiUrl + '/comment/post';
        const data = {
            message: message,
            postedBy: localStorage.getItem('username'),
            userId: localStorage.getItem('userId'),
        }

        try{
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: headers,
                credentials: 'include'
            });

            return (await response.json()).data;
        }
        catch(err){
            return [];
        }
    }

    static async getCommentsAfter(id) {
        const url = apiUrl + '/comment/get-latest-comments/'+id;

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            })

            return (await response.json()).data;
        }
        catch(err){
            return [];
        }
    }

    static async getLatest50(){
        const url = apiUrl + '/comment/get-latest50';

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            })

            return (await response.json()).data;
        }
        catch(err){
            return [];
        }
    }
}

export default Comment;
