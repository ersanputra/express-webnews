const NewsService = require("../services/news.service");

const newsService = new NewsService();
class HomeController {

    async indexHome(req, res) {
        try {
            const newsData = await newsService.getNews(null);
            res.render("home",
                {
                    pageTitle: "HOME | Berita Terkini",
                    layout: "layouts/layouts",
                    news: newsData
                });
        } catch (error) {
            console.log(error);
        }
    }

    async newsDetail(req, res) {
        try {
            const id = req.params.id;
            const newsData = await newsService.getNews(id);
            res.render("home",
                {
                    news: newsData,
                    pageTitle: newsData.title,
                    layout: "layouts/layouts"
                });
        } catch (error) {
            console.log(error);
        }
    }

    

    indexFeedback(req, res) {
        res.render("feedback", 
        { 
            pageTitle: "About", 
            layout: 'layouts/layouts' 
        });
    }

    async getNews(req, res) {
        const data = await newsService.getNewsWithRawQuery();
        res.status(200).json(data);
    }

    async storeNews(req, res) {
        const payload = req.body;
        const store = await newsService.store(payload);

        res.status(201).json(store);
    }

    async getNewsById(req, res) {
        const id = req.params.id;
        const data = await newsService.getNews(id);
        res.status(200).json(data);
    }

    async updateNews(req, res) {
        try {
            const payload = {
                id: req.params.id,
                title: req.body.title,
                cover: req.body.cover,
                content: req.body.content
            };
    
            const updatedNews = await newsService.update(payload);
    
            res.status(201).json(updatedNews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
    }
}

module.exports = HomeController;