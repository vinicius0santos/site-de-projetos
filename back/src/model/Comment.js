const supabase = require("../db");

const Comment = {
    post: async (message, postedBy) => {
        await supabase
            .from('comment')
            .insert({message: message, postedBy: postedBy})
    },
    getLatestComments: async (lastId) => {
        return await supabase
            .from('comment')
            .select('*')
            .gt("id", lastId)
    },
}

module.exports = Comment;