const News = require("../models/News");

const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createNews = async (req, res) => {
  const { title, content } = req.body;
  const author = req.user.name;

  try {
    const news = new News({ title, content, author });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllNews,
  createNews,
};
