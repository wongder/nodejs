const p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve([{ bpid: 123, address: '106 Peter St', city: 'Hamilton' },
             { bpid: 456, address: '81 Hildenboro Sq', city: 'Scarboro' },
             { bpid: 789, address: '45 Loyal Blue Cr', city: 'RH' }]);
  }, 2000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(function () { resolve({ CreditScore: [{ bpid: 123, creditScore: 489 }, { bpid: 456, creditScore: 987 }]}); }, 1000);
});

const p3 = new Promise(function (resolve, reject) {
  setTimeout(function () { resolve({ ScoreComplete: [{ bpid: 789, scoreComplete: 324 }, { bpid: 456, scoreComplete: 948 }]}); }, 3000);
});

Promise.all([p1, p2, p3]).then(function (values) {
    for (let value of values) {
      console.log(Object.values(value));
    };
    // console.log(values);
}).catch(function (error) { console.log(error); });
