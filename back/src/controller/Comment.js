const Comment = require('../model/Comment');

exports.post = async (req, res) => {
    const message = req.body.message;
    const postedBy = req.body.postedBy;

    try{
        if(message.trim() == ''){
            throw new Error('Comentário em branco!');
        }

        const comment = await Comment.post(message, postedBy);

        res.json({
            success: true,
            data: comment.data[0]
        });
    }
    catch(err){
        console.log(err.message)
        res.json({
            success: false,
            data: []
        });
    }
}

exports.getLatestComments = async (req, res) => {
    const lastId = req.body.id;
    
    try{
        const comments = await Comment.getLatestComments(lastId);

        if(comments.data.length > 0){
            res.json({
                success: true,
                data: comments.data
            })
        }
        else{
            res.json({
                success: false,
                data: [],
            });
        }
    }
    catch(err){
        console.log(err.message)
        
        res.json({
            success: false,
            data: []
        });
    }
}

exports.getLatest50 = async (req, res) => {
    try{
        const comments = await Comment.getLatest50();

        if(comments.data.length > 0){
            res.json({
                success: true,
                data: comments.data
            })
        }
        else throw new Error('Nenhum comentário encontrado');
        
    }
    catch(err){
        console.log(err.message);

        res.json({
            success: false,
            data: null
        })
    }
}