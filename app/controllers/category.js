var express = require('express'),
  router = express.Router(),
  CategoryUtil = require('../utils/category');

module.exports = function(app) {
  app.use('/', router);
};

router.post('/category/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  CategoryUtil.createCategory(req.body, (session) => {
    res.redirect('/admin', {
      user: req.user
    })
  }, (err) => {
    res.redirect('/admin', {
      user: req.user
    });
  });
});
