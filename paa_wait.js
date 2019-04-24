'use strict';

// This function waits for an unknown amount of time
module.exports = {
  wait: function wait(delay, callback) {
    // setInterval returns an ID. We need this to stop the timer
    const id = setInterval(() => {
      // Generate a random number between 0 and 1
      const rand = Math.random();

      if (rand > 0.95) {
        // Call the callback function. Note the first parameter is an error
        callback(null, 'Congratulations, you have finished waiting.');
        // Stop the timer
        clearInterval(id);
      } else if (rand < 0.01) {
        // Call the callback function. Note we're setting an error now
        callback('Could not wait any longer!', null);
        // Stop the timer
        clearInterval(id);
      } else {
        // Print to STDOUT
        console.log('Waiting ...');
      }
    }, Number(delay));
  }
};