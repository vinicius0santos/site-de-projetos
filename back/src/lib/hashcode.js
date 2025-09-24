const bcrypt = require("bcryptjs");

exports.genererate = async (value) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(value, salt);

        return hash;
    }
    catch(error){
        throw error;
    }
}

exports.isMatch = async (value, hash) => {
    try{
        const isMatch = await bcrypt.compare(value, hash);

        if(isMatch){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        throw error;
    }
}