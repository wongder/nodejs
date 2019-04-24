'use strict';
const call_wait = require('./paa_wait');

// Calling wait and passing a callback
call_wait.wait(1000, (err, data) => {
  // Did the function return an error?
  if (err) throw new Error(err);
  // Output the data
  console.log(data);
});