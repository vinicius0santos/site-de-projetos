const supabase = require("../db");

const User = {
    insert: async (username, password) => {
        await supabase
            .from('user')
            .insert([{username: username, password: password}]);
    },
    get: async (username, password) => {
        await supabase
            .from('user')
            .select('username', 'password')
            .eq('username', username)
            .eq('passowrd', password)
    }
}

module.exports = User;