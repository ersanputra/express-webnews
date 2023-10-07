const NewsService = require("../services/news.service");

const newsService = new NewsService();

class NewsController {
    async pageCreateNews(req, res) {
        res.render(
            'news/news-create',
            {
                pageTitle : "Create News",
                layout: 'layouts/layouts'
            }
        )
    }

    async pageUpdateNews(req, res) {
        try {
            const id = req.params.id;
            const newsData = await newsService.getNews(id);
            res.render(
                'news/news-update',
                {
                    news: newsData,
                    pageTitle : "Update News",
                    layout: 'layouts/layouts'
                }
            )
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = NewsController;