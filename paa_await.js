'use strict';
const call_wait = require('./paa_wait');
const util = require('util');

// Here we use util.promisify to convert the function to a promise
const promisifyWait = util.promisify(call_wait.wait);

// And here we use await/async.  Cooler huh??
(async () => {
  let result;
  try { result = await promisifyWait(1000); }
  catch(err) { return console.error(err); }
  return console.log(result);
})();