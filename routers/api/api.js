const express = require("express");
const HomeController = require("../../controllers/home.controller");
const api = express.Router();
const CommentController = require("../../controllers/comment.controller")

const homeController = new HomeController
const commentController = new CommentController
api.get('/v1/news', homeController.getNews);
api.post('/v1/news', homeController.storeNews);
api.post('/v1/comments',commentController.storeComment)
api.get('/v1/news/:id', homeController.getNewsById);
api.put('/v1/news/:id', homeController.updateNews);
api.delete('/v1/comments/:id', commentController.deleteComment)

module.exports = api;