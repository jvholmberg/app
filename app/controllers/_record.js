var express = require('express'),
  router = express.Router(),
  RecordUtil = require('../utils/record');

module.exports = function(app) {
  app.use('/record', router);
};

/**
* @attr: Weight
* @fn: Create, Read, Update, Delete
*/
router.post('/weight/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.createWeight(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.post('/weight/update', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.updateWeight(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.post('/weight/delete', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.deleteWeight(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});

/**
* @attr: Session
* @fn: Create, Read, Update, Delete
*/
router.post('/session/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.createSession(req.user, req.body, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/session');
  });
});

router.post('/session/update', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.updateSession(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.get('/session/delete/:recordId/:sessionId', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.deleteSession(req.user, req.params, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/dashboard');
  });
});

/**
* @attr: Nutrition
* @fn: Create, Read, Update, Delete
*/
router.post('/nutrition/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.createNutrition(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.post('/nutrition/update', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.updateNutrition(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.post('/nutrition/delete', (req, res) => {
  if (!req.user) return res.redirect('/login');
  RecordUtil.deleteNutrition(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
