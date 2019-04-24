const express = require('express');
const app = express();
const server = require('http').createServer(app);

const pino = require('pino');
const dest = pino.extreme(); // no arguments
const logger = pino(dest);

const birds = require('./birds');
const bees = require('./bees');

app.use('/birds', birds);
app.use('/bees', bees);

// simulate downstream processing like connection to db taking 5 seconds
setTimeout(function(){
  server.listen(3000, () => pino().info('app listening on port 3000!\naccess http://localhost:3000/birds/tweet or http://localhost:3000/bees/sting'));
  process.send('ready');
}, 5000);


// asynchronously flush every 10 seconds to keep the buffer empty in periods of low activity
setInterval(function () {
  logger.flush()
}, 10000).unref();

// use pino.final to create a special logger that guarantees final tick writes
const handler = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, 'error caused exit');
  // process.exit(err ? 1 : 0);   // handled in server.close()
});
// stops the server from accepting new connections and finishes processing existing connections
const serverClose = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, 'during Server closing');
  server.close(function(err) {
    if (err) finalLogger.error(err, 'error during Server closing');
    process.exit(err ? 1 : 0);
  });
});

// catch all the ways node might exit
process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));
process.on('SIGINT', () => { handler(null, 'SIGINT'); serverClose(null, 'SVRCLS'); });

