const supabase = require("../db");

const User = {
    insert: async (username, password) => {
        await supabase
            .from('user')
            .insert({username: username, password: await password})
    },
    get: async (username) => {
        return await supabase
            .from('user')
            .select('*')
            .eq('username', username)
    },
}

module.exports = User;