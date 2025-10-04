import { apiUrl, headers } from "../../global.js";

class Comment {
    constructor(postedBy) {
        this.data = {
            message: undefined,
            postedBy: postedBy
        }
    }

    async post(message) {
        const url = apiUrl + '/comment/post';
        this.data.message = message;

        const comment = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: headers
        });

        return comment.json();
    }

    static async getCommentsAfter(id) {
        const url = apiUrl + '/comment/get-latest-comments';

        const comments = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: headers
        })
        
        return comments.json();
    }

    static async getLatest50(){
        const url = apiUrl + '/comment/get-latest50';
        console.log(url)

        const comments = await fetch(url, {
            method: 'GET',
            headers: headers
        })

        return comments.json();
    }
}

export default Comment;
