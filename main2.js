const sayHi = require('./greetings2');

// sayHi.hiInEnglish("Christen");
// sayHi.hiInFrench("Camden");
// sayHi.sayHiInEnglish("Christen");
// sayHi.sayHiInFrench("Camden");

console.log(sayHi("Christen"));

console.log(module);

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged', args => {
  console.log(`Listener called with ${args}`);
});

// emitter.emit('messageLogged', { id: 1, url: 'http://', fn: sayHi("whats up doc") });
const emitFn = sayHi("whats up doc");
console.log(`Emit function is ${emitFn}`);
emitter.emit('messageLogged', emitFn);

emitter.on('messageFn', args => {
  args(3);
});
emitter.emit('messageFn', function (a) {
  console.log(`Emitter answer is ${a*2}`);
})
