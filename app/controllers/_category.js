var express = require('express'),
  router = express.Router(),
  CategoryUtil = require('../utils/category');

module.exports = function(app) {
  app.use('/category', router);
};

router.post('/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  CategoryUtil.createCategory(req.body, (doc, msg) => {
    res.redirect('/admin', {
      user: req.user
    });
  }, (err) => {
    res.redirect('/admin', {
      user: req.user
    });
  });
});
router.get('', (req, res) => {
  if (!req.user) return res.redirect('/login');
  CategoryUtil.getCategories((docs, msg) => {
    res.json(docs);
  }, (err) => {
    res.send(err);
  });
});
