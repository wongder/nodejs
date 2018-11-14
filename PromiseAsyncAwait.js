const isMomHappy = true;

// Promise
const willIGetNewPhone = new Promise((resolve, reject) => {
    if (isMomHappy) {
      const phone = {
        brand: 'Samsung',
        color: 'black'
      };
      resolve(phone);
    } else {
      const reason = new Error('mom is not happy');
      reject(reason);
    }
  }
);

// 2nd promise
async function showOff(phone) {
  return new Promise((resolve, reject) => {
      var message = 'Hey friend, I have a new ' + phone.color + ' ' + phone.brand + ' phone';
      resolve(message);
  });
};

// call our promise
async function askMom() {
  try {
    console.log('before asking Mom');

    let phone = await willIGetNewPhone;
    let message = await showOff(phone);

    console.log(message);
    console.log('after asking mom');
  } catch (error) {
    console.log(error.message);
  }
}

(async () => {
  await askMom();
})();




// add two numbers remotely using observable ... async/await

async function addAsync2(num1, num2) {
  // use ES6 fetch API, which return a promise
  // return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
  //   .then(x => x.json());
  return new Promise((resolve, reject) => {
      resolve(num1 + num2);
  });
};

async function askAddAsync2() {
  try {
    console.log('before ask addAsync2');

    let resultA2 = await addAsync2(1, 2);
    let resultB2 = await addAsync2(resultA2, 3);
    let resultC2 = await addAsync2(resultB2, 4);

    console.log('async await total: ' + resultA2 + resultB2 + resultC2);
    console.log(resultA2, resultB2, resultC2);
  } catch (error) {
    console.log(error.message);
  }
};

(async () => {
  await askAddAsync2();
})();




// add two numbers remotely using observable

let resultA, resultB, resultC;

function addAsync(num1, num2) {
  // use ES6 fetch API, which return a promise
  // return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
  //   .then(x => x.json());
  return new Promise((resolve, reject) => {
      resolve(num1 + num2);
  });
}

addAsync(1, 2)
  .then(success => {
    resultA = success;
    return resultA;
  })
  .then(success => addAsync(success, 3))
  .then(success => {
    resultB = success;
    return resultB;
  })
  .then(success => addAsync(success, 4))
  .then(success => {
    resultC = success;
    return resultC;
  })
  .then(success => {
    console.log('promise then total: ' + success);
    console.log(resultA, resultB, resultC);
  });




const loadSomething = () => {
  return fetchSomeData()
    .then(data => doSomethingWith(data))
    .catch(error => logAndReport(error))
};

loadSomething();

const loadSomething2 = async () => {
  try {
    const data = await fetchSomeData();
    return doSomethingWith(data);
  } catch (error) {
     logAndReport(error);
  }
};

loadSomething2();


function fetchSomeData() {
  return new Promise((resolve, reject) => {
    resolve(36);
  });
}
function doSomethingWith(data) {
  console.log('doSomethingWith data is printing it out ' + data);
}
function logAndReport(error) {
  console.log(('logAndReport error is printing it out ' + error));
}



// Please don't do this 😅
Promise.resolve({ some: 'data' })
  .finally(() => { console.log('WHALE HELLO THERE 🐋') })
  .then(data => ({ ...data, anAdditional: 'key'  }))
  .finally(() => { console.log('Looks like we made it past the first step 🙏') })
  .then(data => ({ ...data, yetAnother: 'thing added' }))
  .finally(() => { console.log("We're done I think 🙌") })
  .then(data => {
    console.log('Final result:', data)
  });



function test(fruit) {
  // printing fruit name if value provided
  if (fruit && fruit.name) {
    console.log(fruit.name);
  } else {
    console.log('unknown');
  }
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple

// destructing - get name property only
// assign default empty object {}
function test2({name} = {}) {
  console.log(name || 'unknown2');
}

//test results
test2(undefined); // unknown
test2({ }); // unknown
test2({ name: 'pear', color: 'green' }); // pear


// Include lodash library, you will get _
const _ = require('lodash');
function test3(fruit) {
  console.log(_.get(fruit, 'name', 'unknown3')); // get property name, if not available, assign default value 'unknown'
}

//test results
test3(undefined); // unknown
test3({ }); // unknown
test3({ name: 'orange', color: 'orange' }); // orange



// setTimeout
const parseJsonAsync = (jsonString) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString))
    })
  })
};

const data = '{ "name": "Flavio", "age": 35 }';
parseJsonAsync(data).then(jsonData => console.log("setTimeout output is " + jsonData.name + " " + jsonData.age));



// closure 1
function add(x) {
  function addX(y) {
    return y + x;
  }
  return addX;
}

let add1 = add(1);
let add5 = add(5);

const assert = require('assert');
assert(add1(3) == 4);
assert(add5(3) == 8);

// closure 2
function counter() {
  let count = 0;
  return function() {
    return `Closure result ${++count}`;
  };
}

const closure = counter();
console.log(closure()); // returns 1
console.log(closure()); // returns 2
console.log(closure()); // returns 3



// pipe
const inc = num => num + 1;
const dbl = num => num * 2;
const sqr = num => num * num;

const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const incDblSqr = pipe(inc, dbl, sqr);
const result = incDblSqr(2);
console.log(`Pipe result is ${result}`);



// rest vs spread
const user = {firstname: 'John', surname: 'Doe'};
function getUserDetails(profession, experience) {
  const detail = this.firstname + ' ' + this.surname + ' is an ' + profession + ' with ' + experience + ' years of experience.'
  return detail;
}
// console.log(`Rest vs Spread1: ${getUserDetails.apply(user, ['engineer','20'])}`);
console.log(`Rest vs Spread1: ${getUserDetails(...['engineer','20'])}`);

function getSum() {
  let sum = 0;
  for(let i=0; i<arguments.length; i++){
    sum = sum + arguments[i];
  }
  return sum;
}
const numbers = [10, 10, 20, 20, 30];
// console.log(`Rest vs Spread2: ${getSum.apply(null, numbers)}`);
console.log(`Rest vs Spread2: ${getSum(...numbers)}`);

const a = [1, 2], b = [3, 4];
// const c = [...a,...b]
const c = [a, b]
console.log(`Rest vs Spread3: ${c}`);



// generator function
function *generator(i) {
  yield i;
  yield i + 10;
}
const gen = generator(10);
console.log(`Generator1: ${gen.next().value}`);
console.log(`Generator2: ${gen.next().value}`);
console.log(`Generator3: ${gen.next().value}`);



// parameter context matching
function f([ name, val ]) {
  console.log("Parameter context matching1: " + name, val);
}
function g({ name: n, val: v }) {
  console.log("Parameter context matching2: " + n, v);
}
function h({ name, val }) {
  console.log("Parameter context matching3: " + name, val);
}
f([ "bar", 42 ]);
g({ name: "foo", val:  7 });
h({ name: "bar", val: 42 });



// Export and Require
const Cat = require('./cat');
const cat = new Cat();
console.log(cat.makeSound());



// Class
class Car {
  constructor() {
    this.logger = console.log;
  }
  log() {
    this.logger(`Hello ${this.name}`);
  }
}

class SuvCar extends Car {
  constructor() {
    super();
    this.name = 'SUV Car Name';
  }
}

const suvCar = new SuvCar();
suvCar.log(); // logs Hello SUV Car Name

// static members
class MyClass {
  static myStaticMethod() {
    return 'Static says Hello';
  }

  static get myStaticProperty() {
    return 'Static says Goodbye';
  }
}

console.log(MyClass.myStaticMethod()); // logs: "Hello"
console.log(MyClass.myStaticProperty); // logs: "Goodbye"

// static properties are not defined on object instances
const myClassInstance = new MyClass();
console.log(myClassInstance.myStaticProperty); // logs: undefined

// however, they are defined on subclasses
class MySubClass extends MyClass {};
console.log(MySubClass.myStaticMethod()); // logs: "Hello"
console.log(MySubClass.myStaticProperty); // logs: "Goodbye"



// Generator functions
let fibonacci = {
  *[Symbol.iterator]() {
    let pre = 0, cur = 1;
    for (;;) {
      [ pre, cur ] = [ cur, pre + cur ];
      yield cur;
    }
  }
};

for (let n of fibonacci) {
  if (n > 1000)
    break;
  console.log(`Fibonacci: ${n}`);
}


const obj = {
  * [Symbol.iterator]() {
    yield 'a';
    yield 'b';
    yield 'c';
  }
};
const arr = [...obj]; // ['a', 'b', 'c']
console.log(`Generator Symbol: ${arr}`);



// for of
let s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;
for (let key of s.values()) // insertion order
  console.log(`for of: ${key}`);

let m = new Map();
let symbol = Symbol();
m.set("hello", 42);
m.set(symbol, 34);
m.get(symbol) === 34;
m.size === 2;
for (let [ key, val ] of m.entries())
  console.log(key, val);



// Class set get
let isMarked     = new WeakSet();
let attachedData = new WeakMap();

class Node {
  constructor (id)   { this.id = id                  }
  mark        ()     { isMarked.add(this)            }
  unmark      ()     { isMarked.delete(this)         }
  marked      ()     { return isMarked.has(this)     }
  set data    (data) { attachedData.set(this, data)  }
  get data    ()     { return attachedData.get(this) }
}

let foo = new Node("foo");

JSON.stringify(foo) === '{"id":"foo"}';
foo.mark();
foo.data = "baz";
foo.data === "bar";
console.log(`Class set get is ${foo.data}`);



// Promise
function msgAfterTimeout (msg, who, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
  })
}
msgAfterTimeout("Hey", "Foo", 100).then((msg) =>
  msgAfterTimeout(msg, "Bar", 200)
).then((msg) => {
  console.log(`done after 300ms: ${msg}`)
});