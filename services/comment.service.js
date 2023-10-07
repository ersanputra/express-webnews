const { comments } =  require('../models');

class CommentService {
    constructor() {
        this.commentModel = comments;
    }

    async store(payload) {
        const { name, comment, news_id} = payload;
        const date = new Date();

        const commentNew = this.commentModel.create({
            name, comment, news_id,
            createdAt : date, updatedAt: date
        })

        return commentNew;
    }

    async delete(id) {
        try {
            const comment = await this.commentModel.findOne({ where: { id: id } });
            
            if (!comment) {
                throw new Error("Komentar tidak ditemukan");
            }

            await comment.destroy();
            return { message: "Komentar Berhasil dihapus" };
        } catch (error) {
            console.error('Failed to delete Comment:', error);
            throw error;
        }
    }
}

module.exports = CommentService;