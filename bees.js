const express = require('express');
const router = express.Router();
const logger = require('pino')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  logger.info('Time for bees is', Date.now());
  next();
});
// define the home page route
router.get('/sting', function (req, res) {
  res.send('Bees home page');
});

module.exports = router;