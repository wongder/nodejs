let fs = require("fs");
let data = doFunction('input.txt');

function test(parm) { console.log(data.toString() + parm); }
test(1);
console.log("Program Ended first time");


function test2(parm) {
    fs.readFile('input2.txt', function (err, data) {
        if (err) return console.error(err);
        console.log(data.toString() + parm);
    });
}
test2(2);
console.log("Program Ended second time");


function doFunction(fileName) { return fs.readFileSync(fileName); }

//Try promises
let Promise = require('bluebird');
let myfs = Promise.promisifyAll(require("fs"));

function promise(parm) {
    myfs.readFileAsync("input3.json")
        .then(JSON.parse)
        .then(function (val) {
            for(let item in val) { console.log("Json file item are " + parm + ": " + JSON.stringify(val[item],null,2)); }
        })
        .catch(SyntaxError, function (e) { console.error("invalid json in file"); })
        .catch(function (e) { console.error("unable to read file"); });
}
promise(3);
console.log("Program Ended third time");


//Try async/await
const makeRequest = async () => {
    await test(4)
    await test2(5)
    await promise(6)
    //throw new Error("oops");
}

makeRequest()
    .catch(err => {
        console.log(err);
    })
