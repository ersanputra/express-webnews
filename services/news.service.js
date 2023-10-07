const { news, comments, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class NewsService {
    constructor() {
        this.newsModel = news;
    }

    async getNews(id) {
        let data;
        if (id) {
            console.log(id);
            data = await this.newsModel.findOne({
                where: {
                    id
                }
            })
        } else {
            data = await this.newsModel.findAll();
        }

        return data;
    }

    async getNewsWithRawQuery() {
        const data = await sequelize.query("SELECT * FROM news", { type: QueryTypes.SELECT })
        return data;
    }

    async store(payload) {
        const date = new Date();
        const { title, cover, content, author, isPublic } = payload;
        
        const news = this.newsModel.create({
            title, cover, content, author,
            createdAt :date, updatedAt: date, isPublic
        });
        
        return news;
    }

    async getNews(id){
        let data;
        if (id) {
            console.log(id);
            data = await this.newsModel.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: comments
                    }
                ]
            })
        } else {
            data = await this.newsModel.findAll()
        }

        return data;
    }

    async update(payload) {
        try {
            const { id, title, cover, content, author, isPublic } = payload;

            const news = await this.newsModel.findOne({
                where: { id }
            });
    
            if (!news) {
                throw new Error("News tidak ditemukan.");
            }
    
            await news.update({ title, cover, content }); 
            return news;
        } catch (error) {
            console.error('Gagal memperbarui News:', error);
            throw error;
        }
    }

}

module.exports = NewsService;