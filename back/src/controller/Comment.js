const Comment = require('../model/Comment');

exports.post = async (req, res) => {
    const message = req.body.message;
    const postedBy = req.body.postedBy;

    try{
        if(message.trim() == ''){
            throw new Error('Comentário em branco!');
        }

        await Comment.post(message, postedBy);
        res.json({success: true});
    }
    catch(err){
        console.log(err.message)
        res.json({success: false});
    }
}

exports.getLatestComments = async (req, res) => {
    const lastId = req.body.lastId;
    
    try{
        const comments = await Comment.getLatestComments(lastId);

        if(user.data[0] != null){
            res.json({
                sucess: true,
                data: comments.data
            })
        }
        else{
            throw new Error("Nenhum novo comentário encontrado!")
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
