var express = require('express'),
  router = express.Router();

module.exports = function(app) {
  app.use('/logout', router);
};

router.post('/', (req, res) => {
  req.logout();
  return res.redirect('/');
});
