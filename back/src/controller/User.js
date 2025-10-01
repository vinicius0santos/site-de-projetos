const User = require('../model/User');
const hashcode = require('../lib/hashcode');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES;

exports.insert = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(username.trim() == '' || password.trim() == ''){
            throw new Error('Usuário ou senha em branco!');
        }

        const user = await User.get(username);

        if(user.data.length > 0){
            throw new Error('Usuário já existe!');
        }

        await User.insert(username, hashcode.generate(password));
        res.json({success: true});
    }
    catch(err){
        console.log(err.message)
        res.json({success: false});
    }
}

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        if(username.trim() == '' || password.trim() == ''){
            throw new Error('Usuário ou senha em branco!');
        }

        const user = await User.get(username);

        if(await hashcode.isMatch(password, user.data[0].password)){
            const token = jwt.sign(
                {id: user.data[0].id, username: user.data[0].username},
                SECRET,
                {expiresIn: EXPIRES}
            );

            res.json({
                success: true,
                data: {
                    id: user.data[0].id,
                    username: user.data[0].username,
                    createdAt: user.data[0].created_at
                },
                token
            });
        }
        else{
            throw new Error('Usuário inválido!');
        }
    }
    catch(err){
        console.log(err.message)
        res.json({
            success: false,
            data: null
        });
    }
}
