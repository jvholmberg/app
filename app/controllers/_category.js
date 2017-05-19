var express = require('express'),
  router = express.Router(),
  CategoryUtil = require('../utils/category');

module.exports = function(app) {
  app.use('/', router);
};

router.post('/category/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  CategoryUtil.createCategory(req.body, (doc, msg) => {
    res.redirect('/admin', {
      user: req.user
    })
  }, (err) => {
    res.redirect('/admin', {
      user: req.user
    });
  });
});
