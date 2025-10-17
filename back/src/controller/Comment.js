const Comment = require('../model/Comment');

exports.post = (req, res) => {
    const message = req.body.message;
    const postedBy = req.body.postedBy;
    const userId = req.body.userId;

    try {
        if (message.trim() == '') {
            throw new Error('Comentário em branco!');
        }

        Comment.post(message, postedBy, userId);

        res.json({ success: true });
    }
    catch (err) {
        console.error(err.message)
        res.json({ success: false });
    }
}

exports.getLatestComments = (req, res) => {
    const lastCommentId = req.params.lastCommentId;

    try {
        const comments = Comment.getLatestComments(lastCommentId);

        res.json({
            success: true,
            data: comments
        })
    }
    catch (err) {
        console.error(err.message)

        res.json({
            success: false,
            data: []
        });
    }
}

exports.getLatest50 = (req, res) => {
    try {
        const comments = Comment.getLatest50();

        res.json({
            success: true,
            data: comments
        })
    }
    catch (err) {
        console.error(err.message);

        res.json({
            success: false,
            data: []
        })
    }
}