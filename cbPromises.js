var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require("fs");
var data = doFunction('input.txt');
function test(parm) { console.log(data.toString() + parm); }
test(1);
console.log("Program Ended first time");
function test2(parm) {
    fs.readFile('input2.txt', function (err, data) {
        if (err)
            return console.error(err);
        console.log(data.toString() + parm);
    });
}
test2(2);
console.log("Program Ended second time");
function doFunction(fileName) { return fs.readFileSync(fileName); }
//Try promises
var Promise = require('bluebird');
var myfs = Promise.promisifyAll(require("fs"));
function promise(parm) {
    myfs.readFileAsync("input3.json")
        .then(JSON.parse)
        .then(function (val) {
        for (var item in val) {
            console.log("Json file item are " + parm + ": " + JSON.stringify(val[item], null, 2));
        }
    })
        .catch(SyntaxError, function (e) { console.error("invalid json in file"); })
        .catch(function (e) { console.error("unable to read file"); });
}
promise(3);
console.log("Program Ended third time");
//Try async/await
var makeRequest = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test(4)];
            case 1:
                _a.sent();
                return [4 /*yield*/, test2(5)];
            case 2:
                _a.sent();
                return [4 /*yield*/, promise(6)
                    //throw new Error("oops");
                ];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
makeRequest()
    .catch(function (err) {
    console.log(err);
});
