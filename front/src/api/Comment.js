import { apiUrl, headers } from "../global";

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

        let comment;
        try{
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.data),
                headers: headers
            });

            comment = (await response.json()).data;
        }
        catch(err){
            comment = [];
        }

        return comment;
    }

    static async getCommentsAfter(id) {
        const url = apiUrl + '/comment/get-latest-comments';

        let comments;
        try{
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({id: id}),
                headers: headers
            })

            comments = (await response.json()).data;
        }
        catch(err){
            comments = [];
        }
        
        return comments;
    }

    static async getLatest50(){
        const url = apiUrl + '/comment/get-latest50';

        let comments;
        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })

            comments = (await response.json()).data;
        }
        catch(err){
            comments = [];
        }

        return comments;
    }
}

export default Comment;
