'use strict';
const call_wait = require('./paa_wait');
const util = require('util');

// Here we use util.promisify to convert the function to a promise
const promisifyWait = util.promisify(call_wait.wait);

//And here we use the promisified function. Cool huh?
promisifyWait(1000)
  .then(data => console.log(data))
  .catch(err => console.error(`[Error]: ${err}`));