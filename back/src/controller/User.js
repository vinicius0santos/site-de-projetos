const User = require('../model/User');
const hashcode = require('../lib/hashcode');

exports.insert = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        await User.insert(username, hashcode.genererate(password));
        res.send({message: 'success'});
    }
    catch(err){
        console.log(err.message)
        res.send({message: 'failure'});
    }
}

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await User.get(username);
        if(await hashcode.isMatch(password, user.data.password)){
            res.send({user: user});
        }
        else{
            res.send({user: null});
        }
    }
    catch(err){
        console.log(err.message)
        res.send({message: 'failure'});
    }
}