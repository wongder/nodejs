// " ".repeat(4 * depth);
console.log("foo".repeat(3));


const animals = [['🐕', '🐶'], ['😺', '🐈']];
// const flatAnimals = animals2.flat();
const flatAnimals = [].concat(...animals);
// same as: const flatAnimals = animals2.flat(1);
console.log(flatAnimals); // ['🐕', '🐶', '😺', '🐈']


const animals2 = ['🐕', '🐈', '🐑', '🐮'];
const noises = ['woof', 'meow', 'baa', 'mooo'];
const mappedOnly = animals2.map((animal, index) => [animal, noises[index]]);
// const mappedAndFlatten = animals2.flatMap((animal, index) => [animal, noises[index]]);
const mappedAndFlatten = [].concat(...mappedOnly);
console.log(mappedOnly);  // [['🐕', 'woof'], ['🐈', 'meow'], ['🐑', 'baa'], ['🐮', 'mooo']
console.log(mappedAndFlatten);  // ['🐕', 'woof', '🐈', 'meow', '🐑', 'baa', '🐮', 'mooo']


// to calculate the sum of array elements
const arr = [1,2,3,4];
const sum = (arr) => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
};
console.log(`Imperative Declarative functions result is ${sum(arr)}`);

const sum2 = (arr) => arr.reduce((total, item) => total += item, 0);
console.log(`Imperative Declarative functions result2 is ${sum2(arr)}`);

const doubled = arr.reduce((accumulator, item) => {
  accumulator.push(item * 2);
  return accumulator;
}, []);
console.log(`Imperative Declarative functions result3a is ${doubled}`);
const doubled2 = (arr) => arr.reduce((accumulator, item) => {
  accumulator.push(item * 2);
  return accumulator;
}, []);
console.log(`Imperative Declarative functions result3b is ${doubled2(arr)}`);

const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ;
  return tally;
} , {});
console.log(`Imperative Declarative functions result4 is ${JSON.stringify(count)}`);  // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

const data = [
  {a: 'happy', b: 'robin', c: ['blue','green']},
  {a: 'tired', b: 'panther', c: ['green','black','orange','blue']},
  {a: 'sad', b: 'goldfish', c: ['green','red']}
];
const colors = data.reduce((total, amount) => {
  amount.c.forEach( color => { total.push(color); });
  return total;
}, []);
console.log(`Imperative Declarative functions result5 is ${colors}`); // ['blue','green','green','black','orange','blue','green','red']

function increment(input) { return input + 1; }
function decrement(input) { return input - 1; }
function double(input) { return input * 2; }
function halve(input) { return input / 2; }
let pipeline = [increment, double, decrement];
const reduceFunctionResult = pipeline.reduce(function(accumulator, itemIsFunction) {
  return itemIsFunction(accumulator);
}, 2);
console.log(`Imperative Declarative functions reduceFunctionResult is ${reduceFunctionResult}`); // 3


// Destructuring
const users = [
  {
    id: 1,
    name: "Jonathon Haley",
    username: "Monte.Weber2",
    email: "Daphne43@yahoo.com",
    phone: "1-563-675-1857 x11708",
    website: "carmela.net",
    password: "hashed_password"
  },
  {
    id: 2,
    name: "Dean John",
    username: "dd.1",
    email: "deno@google.com",
    phone: "1-123-543-1857 123212",
    website: "dd.net",
    password: "Dean_hashed_password"
  }
];
const hobbies = ['chess', 'pool'];
// this will add hobbies to users array and return newUsers array
const newUsers = users.map(u => ({...u, hobbies}));
console.log(`Destructuring result ${JSON.stringify(newUsers)}`);

const contactInfo = users.map(({email, website, phone}) => ({email, website, phone}));
console.log(`Destructuring result2 ${JSON.stringify(contactInfo)}`);

// this will return newUsers with all user having name 'te'
const newUsers2 = users.map(u => u.id == 2? ({...u, name: 'te'}): u);
console.log(`Destructuring result3 ${JSON.stringify(newUsers2)}`);

const newUsers3 = users.map(u => Object.keys(u).reduce((newObj, key) => key != 'website' ? { ...newObj, [key]: u[key] } : newObj, {}));
console.log(`Destructuring result4 ${JSON.stringify(newUsers3)}`);

// above via reduce only ... get working!!!
const newUsers4 = users.reduce((newObj, key) => {
  key.key != 'website' ? newObj.push({ ...key, [key]: key[key] }) : null;
  return newObj;
}, []);
console.log(`Destructuring result5 ${JSON.stringify(newUsers4)}`);


// Currying
// Object oriented approach
const getUglyFirstCharacterAsLower = str => str.substr (0, 1).toLowerCase ();
// Functional approach
const curriedSubstring = start => length => str => str.substr(start, length);
const curriedLowerCase = str => str.toLowerCase ();

const getComposedFirstCharacterAsLower = str => curriedLowerCase (curriedSubstring (0) (1) (str));

// Compose
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const getNewComposedFirstCharacterAsLower = compose (curriedLowerCase, curriedSubstring (0) (1));
if (getComposedFirstCharacterAsLower('Martin') === getNewComposedFirstCharacterAsLower('Martin')) {
  console.log (`These two provide equal results of ${getNewComposedFirstCharacterAsLower('Martin')}`);
};


const movies = [{
     "id": 1,
     "name": "Matrix"
}, { "id": 2,
     "name": "Star Wars"
}, { "id": 3,
     "name": "The wolf of Wall Street"
}];
const series = [{
     "id": 4,
     "name": "South Park"
}, { "id": 5,
     "name": "The Simpsons"
}, { "id": 6,
     "name": "The Big Bang Theory"
}];

const get = property => object => object[property];
// Now from this function I can create another function, called getId that is just a partial configuration of the get function:
const getId = get('id');
// Isn't that nice? But we can go one step further. Suppose now, that we want to extract the name from our objects. Just create a function called getName derived from the get function:
const getName = get('name');
// At this step, getId is still a function and this is great because we are now able to use it inside our map calls:
const Promise = require('bluebird');
function curry() {
  return new Promise(resolve => {
    resolve(console.log(`Curry result movie is ${movies.map(getId)} and series is ${series.map(getId)} and movie name is ${movies.map(getName)} and series name is ${series.map(getName)}`));
  });
};
curry();


// Functions without parms
const books = [{
    "type": "Fiction",
    "author": "John Smith"
}, {"type": "Technology",
    "author": "Bill Snow"
}, {"type": "Biography",
    "author": "Jen Furlow"
}, {"type": "Technology",
    "author": "Bob Wood"
}];
function getBooks(){
  return books.filter(isTechnology);
}
//Small functions with points
function isTechnology(book){
  return book.type === "Technology";
}
console.log(`Point free functions result of IT books are ${JSON.stringify(getBooks())}`);


// Default function parameters and Object property shorthand with same property variable names
function doSomethingWithObject(object = {property: 'hello'}, text = 'world') {
  console.log(`Default function parameter assignment: ${object.property}`) // 'hello'
  console.log(`Default function parameter assignment: ${text}`) // 'world'
};
doSomethingWithObject(object = {property: 'good-bye'});

let dinner = 'soup';
let mealPlan = {
  //dinner: dinner
  dinner
};
console.log(`Object property shorthand with same property variable names: ${mealPlan.dinner}`);


// Flow-control-callbacks-promises-async-await
async function fccpaa1(parm) { return parm + '2' }
async function fccpaa2(parm) { return parm + '3' }
async function fccpaa3(parm) { return parm + '4' }
async function fccpaa4(parm) { let finalValue = parm + '5'; console.log(`fccpaa final value is ${finalValue}`) }

async function connect() {
  const
    connection = await fccpaa1('fccpaa1'),
    session = await fccpaa2(connection),
    user = await fccpaa3(session),
    log = await fccpaa4(user);
  return true;
}

// higher-order function to catch errors
function catchErrors(fn) {
  return function (...args) {
    return fn(...args).catch(err => {
      console.log('ERROR', err);
    });
  }
}

(async () => {
  await catchErrors(connect)();
})();


async function fccpaa5(parm1, parm2) { let finalValue = parm1 + parm2; console.log(`Async/await final value is ${finalValue}`) }
const makeRequest = async () => {
  const value1 = await fccpaa1('hi ');
  const value2 = await fccpaa2(value1);
  return fccpaa5(value1, value2);
};
(async () => { await makeRequest() })();


// Moment.js
const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const calgary = momentTimeZone.tz(moment(), "America/Edmonton");
console.log(`Moment time in Calgary is ${calgary}`);
const calgaryUTC = moment.utc(calgary);
console.log(`Moment time in Calgary in UTC is ${calgaryUTC}`);
const toronto = calgary.clone().tz("America/Toronto");
console.log(`Moment Calgary time in Toronto is ${toronto}`);
const calgaryInToronto = calgaryUTC.clone().tz("America/Toronto");
console.log(`Moment Calgary UTC time in Toronto is ${calgaryInToronto}`);


// Beware items
function someFunc() {
  return { prop: true };
}
console.log(`Beware items ${JSON.stringify(someFunc())}`);

let badMath = 0.2 + 0.1;
console.log(`Beware items ${badMath}`);

const Dinero = require('dinero.js');
try {
  const amount1 = Dinero({ amount: 0.1, currency: 'CA' });
  console.log(`Monetary amount1 is ${amount1}`);
} catch (e) { console.log(`Dinero error with ${e}`); }

const currency = require('currency.js');
const amount2 = currency(0.1).add(0.2);
console.log(`Currency amount2 is ${amount2}`);


console.log(`Version is: ${process.version}`);

const startUsage = process.cpuUsage();
console.log(`StartUsage: ${JSON.stringify(startUsage)}`);
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));
console.log(process.memoryUsage());


// Memory leak
let leakyData = [];

class SimpleClass {
  constructor(text){
    this.text = text;
  }
}

function getAndStoreRandomData(){
  var randomData = Math.random().toString();
  var randomObject = new SimpleClass(randomData);

  leakyData.push(randomObject);
}

function generateHeapDumpAndStats(){
  //1. Force garbage collection every time this function is called
  try {
    global.gc();
  } catch (e) {
    console.log("You must run program with 'node --expose-gc index.js' or 'npm start'");
    process.exit();
  }

  //2. Output Heap stats
  let heapUsed = process.memoryUsage().heapUsed;
  console.log("Program is using " + heapUsed + " bytes of Heap.")

  //3. Get Heap dump
  // process.kill(process.pid, 'SIGUSR2');
}

//Kick off the program
setInterval(getAndStoreRandomData, 5); //Add random data every 5 milliseconds
setInterval(generateHeapDumpAndStats, 2000); //Do garbage collection and heap dump every 2 seconds
