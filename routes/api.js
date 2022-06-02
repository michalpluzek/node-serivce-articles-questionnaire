const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET all news */
router.get('/', (req, res, next) => {
  const search = req.query.search || '';
  let sort = req.query.sort || defaultSort;

  if (sort !== -1 || sort !== 1) sort = defaultSort;

  const titleToSearch = new RegExp(search.trim(), 'i');
  const findNews = News.find({ title: titleToSearch })
    .sort({ created: sort })
    .select('_id title description');
  findNews.exec((err, data) => {
    res.json(data);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const findNews = News.findById(id).select('_id title description');

  findNews.exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
