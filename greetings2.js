// module.exports = {
//   sayHiInEnglish: function sayHiInEnglish(message) {
//     console.log("Hello " + message);
//   },
//
//   sayHiInFrench: function sayHiInFrench(message) {
//     console.log("Bonjour " + message);
//   }
// }

function sayHiInEnglish(message) {
  // console.log("Hello " + message);
  return `Hello ${message}`;
}

// function sayHiInFrench(message) {
//   console.log("Bonjour " + message);
// }

// module.exports.hiInEnglish = sayHiInEnglish;
// module.exports.hiInFrench = sayHiInFrench;
// module.exports = { sayHiInEnglish, sayHiInFrench };
module.exports = sayHiInEnglish;
console.log(module);
