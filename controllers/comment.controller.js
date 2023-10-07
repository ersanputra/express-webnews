const CommentService = require("../services/comment.service");

const commentService = new CommentService();
class CommentController {
    async storeComment(req, res) {
        try {
            const comment = await commentService.store(req.body);
            res.status(201).json(comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Gagal menyimpan komentar.'});
        }
    }

    async deleteComment(req, res) {
        try {
            const id = req.params.id;
    
            const comment = await commentService.delete(id);
    
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
    }
}

module.exports = CommentController;