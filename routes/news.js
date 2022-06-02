const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET news page. */
router.get('/', (req, res, next) => {
  const search = req.query.search || '';
  const titleToSearch = new RegExp(search.trim(), 'i');

  const findNews = News.find({ title: titleToSearch }).sort({ created: -1 });

  findNews.exec((err, data) => {
    res.render('news', { title: 'News', data, search });
  });
});

module.exports = router;
