var express = require('express'),
  router = express.Router(),
  RecordUtil = require('../utils/record'),
  SessionUtil = require('../utils/session'),
  NutritionUtil = require('../utils/nutrition'),
  WeightUtil = require('../utils/weight');

module.exports = function(app) {
  app.use('/record', router);
};

/**
* @attr: Weight
* @fn: Create, Read, Update, Delete
*/
router.post('/weight/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  WeightUtil.createWeight(req.user, req.body, (doc, msg) => {
    console.log(msg);
    req.flash('success', msg);
    res.redirect('/dashboard');
  }, (err) => {
    console.log(err);
    req.flash('error', err);
    res.redirect('/dashboard');
  });
});
router.post('/weight/update', (req, res) => {
  if (!req.user) return res.redirect('/login');
  WeightUtil.updateWeight(req.user, req.body, (doc, msg) => {
    req.flash('success', msg);
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/dashboard');
  });
});
router.post('/weight/delete', (req, res) => {
  if (!req.user) return res.redirect('/login');
  WeightUtil.deleteWeight(req.user, req.body, (doc, msg) => {
    req.flash('success', msg);
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/dashboard');
  });
});

/**
* @attr: Session
* @fn: Create, Read, Update, Delete
*/
router.post('/session/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  SessionUtil.createSession(req.user, req.body, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/session');
  });
});

router.post('/session/update', (req, res) => {
  if (!req.user) return res.redirect('/login');
  SessionUtil.updateSession(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.get('/session/delete/:recordId/:sessionId', (req, res) => {
  if (!req.user) return res.redirect('/login');
  SessionUtil.deleteSession(req.user, req.params, (doc, msg) => {
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
  NutritionUtil.createNutrition(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.post('/nutrition/update', (req, res) => {
  if (!req.user) return res.redirect('/login');
  NutritionUtil.updateNutrition(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
router.post('/nutrition/delete', (req, res) => {
  if (!req.user) return res.redirect('/login');
  NutritionUtil.deleteNutrition(req.user, req.body, (doc, msg) => {

  }, (err) => {

  });
});
