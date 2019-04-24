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
    console.log("You must run program with 'node --expose-gc index.js' and ctrl + c to stop");
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
