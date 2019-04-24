const timeFn = (fn, args = []) => {
  const start = Date.now();
  const returnValue = fn(...args);
  const end = Date.now();
  console.log(`Execution took ${end - start} ms`);
  return returnValue;
};

const summate = (countTo) => {
  let value = 0;
  for (let i = 0; i < countTo; i++) {
    value += i;
  }
  return value;
};

let sum = timeFn(summate, [1000000000]);
console.log(`Sum is ${sum}`);


let simpleMemoizer = (fn) => {
  // Set up a lookup table within a closure so we have
  // access every time our inner function is called
  const lookupTable = {};
  return (arg) => {
    // Step 1
    if(arg in lookupTable) {
      // Step 2
      return lookupTable[arg];
    } else {
      // Step 3
      let returnValue = fn(arg);
      // Step 4
      lookupTable[arg] = returnValue;
      // Step 5
      return returnValue;
    }
  }
};

const memoSummate = simpleMemoizer(summate);

timeFn(memoSummate, [100000000]);
timeFn(memoSummate, [100000000]);