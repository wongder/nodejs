const express = require('express');
const router = express.Router();
const logger = require('pino')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  logger.info('Time for birds is', Date.now());
  next();
});
// define the home page route
router.get('/tweet', function (req, res) {
  res.send('Birds home page');
});

module.exports = router;