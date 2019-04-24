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


// Folds
const fetch = require('node-fetch');
const SOURCE_URL = 'https://www.reddit.com/r/reactiongifs.json';

fetch(SOURCE_URL)
  .then(response => response.json())
  .then(fold)
  .catch(err => console.error(`Fold error: ${err}`));

function fold(json) {
  // here's where we deal with the data
  console.log(`Fold output: ${JSON.stringify(json.data.children)}`);
  //console.log(`Fold output: ${json.data.children[1].data.title}`);
}


// Revealing Module Pattern
const module1 = (() => {
  //private
  let color = 'red';
  let model;
  function setModel(m) { model = m; }
  let privatePrice = 800;
  let getModel = function (m) {
    setModel(m);
    return model;
  };
  // public
  return {
    price: privatePrice,
    model: getModel
  }
})();

console.log(`Revealing module pattern price is ${module1.price}`); // 800
console.log(`Revealing module pattern model is ${module1.model('audi')}`); // audi


// Async/await promise all
const util = require('util');
const promisifyGetGoals = util.promisify(getGoals);
const promisifyGetAccounts = util.promisify(getAccounts);

(async () => {
  const [goals, accounts] = await Promise.all([
    promisifyGetGoals(2000),
    promisifyGetAccounts(500)
  ]);
  console.log(`Async await promisify all goals are: ${JSON.stringify(goals)}`);
  console.log(`Async await promisify all accounts are: ${JSON.stringify(accounts)}`);
})();

function getGoals(delay, callback) {
  const id = setInterval(() => {
    callback(null, {
      Goals: {
        Retirement: [
          { goalId: 12345, goalDesc: 'Retirement goal 1' },
          { goalId: 67890, goalDesc: 'Retirement goal 2' }
        ]
      }
    });
    clearInterval(id);
    console.log('Async await promisify waiting')
  }, Number(delay));
}
function getAccounts(delay, callback) {
  const id = setInterval(() => {
    callback(null, {
      Accounts: {
        Investment: [
          { accountId: 43210, accountDesc: 'Canadian Equity' },
          { accountId: 98765, accountDesc: 'US Equity' }
        ]
      }
    });
    clearInterval(id);
    console.log('Async await promisify waiting')
  }, Number(delay));
}


// Simulate promise finally with final then cuz finally doesn't take any parameters
const promisifyGetNumber = util.promisify(getNumber);

function getNumber(delay, callback) {
  const id = setInterval(() => {
    callback(null, delay);
    clearInterval(id);
    console.log('Async await promisify waiting')
  }, Number(delay));
}

promisifyGetNumber(2000).then(resolve => resolve / 1)
// promisifyGetNumber(2000).then(resolve => resolve / a)
                        .then(resolve => { console.log(`Chain simulate promise is ${resolve}`); return resolve * 2 })
                        .catch(err => console.error(`Chain simulate promise fold error: ${err}`))
                        .then(resolve => console.log('Chain simulate promise printing again is', resolve));


// Classes
class Dinosaur{
  constructor(color){
    this._color = color;
  }
}
//Brontosaurus inherits from Dinosaur class using the extends keywords
class Brontosaurus extends Dinosaur{
  constructor(color,isHerbivore, legs, length){
    //super must be implemented before the child class properties.
    super(color)
    //here we are assigning new properties to our child class
    this._herbivore= isHerbivore;
    this._legs = legs;
    this._length= length;
  }

  get color(){
    return this._color.toUpperCase();
  }
  get isHerbivore(){
    return this._herbivore;
  }
  get legs (){
    return this._legs;
  }
  set length (length){
    this._length = length;
  }
  get length(){
    return this._length;
  }
}

const bront = new Brontosaurus("Purple",true, 4, 25);
console.log(`Class dino with bronto color is ${bront.color}`);//PURPLE
console.log(`Class dino with bronto diet is ${bront.isHerbivore}`);//true
console.log(`Class dino with bronto has ${bront.legs} legs`);
bront.length = 29;
console.log(`Class dino with bronto is ${bront.length} long`);

