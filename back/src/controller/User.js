const User = require('../model/User');
const hashcode = require('../lib/hashcode');

exports.insert = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(username.trim() == "" || password.trim() == ""){
            throw new Error("Usuário ou senha em branco!");
        }

        const user = await User.get(username);

        if(user.data.length > 0){
            throw new Error("Usuário já existe!");
        }

        await User.insert(username, hashcode.genererate(password));
        res.json({message: 'success'});
    }
    catch(err){
        console.log(err.message)
        res.json({message: 'failure'});
    }
}

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(username.trim() == "" || password.trim() == ""){
            throw new Error("Usuário ou senha em branco!");
        }

        const user = await User.get(username);

        if(await hashcode.isMatch(password, user.data[0].password)){
            res.json({user: user.data[0]});
        }
        else{
            throw new Error("Usuário inválido!");
        }
    }
    catch(err){
        console.log(err.message)
        res.json({user: null});
    }
}