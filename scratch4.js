'use strict';

try {
// iffey es5
  (function () {
    var foo = 'bar es5';

    // Outputs: 'bar'
    console.log(foo);
  })();
// ReferenceError: foo is not defined
  console.log(foo);
} catch (e) {
  console.log(`iffy es5 error with ${e}`);
}

try {
// iffey es6
  {
    let foo = 'bar es6';

    // Outputs: 'bar'
    console.log(foo);
  }
// ReferenceError: foo is not defined
  console.log(foo);
} catch (e) {
  console.log(`iffy es6 error with ${e}`);
}


// Christen's for loop problem
for (let i = 0; i <= 5; i += 2) {
  console.log('Dog');
  for (let j = i; j >= 1; j --) {
    console.log('Cat');
  }
}

for (let k = 1; k > 2; k ++) {
   console.log('Horse');
}


/* Testing falsey and truthy values;
null
undefined
NaN
empty string ('')
0
false */
function testTF(value) {
  if (typeof value !== 'undefined' && value && value.length > 0 && value !== ' ') {
    console.log('Testing truthy falsey is TRUE');
  } else {
    console.log('Testing truthy falsey is FALSE');
  }
}

testTF(null);
testTF(undefined);
testTF(NaN);
testTF('');
testTF(0);
testTF(false);
testTF(' ');
testTF({});
testTF([]);


// Classes
// Parent class
class Shape {
  constructor(id, x, y) {
    this.id = id;
    this.location(x, y);
  }
  location(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `Shape with id = ${this.id}`
  }
  getLocation() {
    return {
      x: this.x, y: this.y
    }
  }
}
// Child class
class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y);
    this.radius = radius;
  }
  static defaultCircle() {
    return new Circle('default', 0, 0, 100)
  }
  toString() {
    return `Circle of radius ${this.radius} and parent description ${super.toString()}`
  }
}

let defaultCircle = Circle.defaultCircle();
console.log(`Default circle has child description ${defaultCircle}`);
let myCircle = new Circle('123', '5px', '10px', 5);
console.log(myCircle.toString());
console.log(myCircle.getLocation());

