const supabase = require("../db");

const Comment = {
    post: async (message, postedBy) => {
        return await supabase
            .from('comment')
            .insert({message: message, posted_by: postedBy})
            .select()
    },
    getLatestComments: async (lastId) => {
        return await supabase
            .from('comment')
            .select('*')
            .gt("id", lastId)
    },
    getLatest50: async () => {
        return await supabase
            .from('comment')
            .select('*')
            .order('id', {ascending: false})
            .limit(50)
    }
}

module.exports = Comment;