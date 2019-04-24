'use strict';

const http = require('http');
const autocannon = require('autocannon');

const server = http.createServer(handle);

server.listen(0, startBench);

function handle (req, res) {
  res.end('hello world')
}

function startBench () {
  const url = 'http://localhost:3080';

  autocannon({
    url: url,
    connections: 100,
    duration: 60,
    headers: {
      // by default we add an auth token to all requests
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJjYyI6IjAxMDIwIiwicmVtb3RlYWRkciI6IjEwLjE1NS41OC4yNCIsImFjZjJpZCI6Im1vaGFkMjUiLCJzdWIiOiJ1cm46Y29tOnRkOmFwaTpjbGllbnRpZDpUZXN0U2NvcGVDbGllbnQiLCJ2ZXIiOiIxLjEiLCJqZmMiOiIyMzQ1MDEiLCJ1c2VyYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdPVzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNDMuMC4yMzU3LjEzNCBTYWZhcmkvNTM3LjM2IiwiZGlyZWN0b3J5IjoiVERCRkciLCJ1c2VyaWQiOiJtb2hhZDI1IiwiY2xpZW50X2lkIjoiVGVzdFNjb3BlQ2xpZW50IiwicmVhZG9ubHkiOiJmYWxzZSIsImpjIjoiMjAiLCJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsImV4cCI6MjE2MjA0MzY5Mywic2NvcGUiOlsiYXBpLm1nbXQuaW5mby5yIiwiaW52YS53aXBwLmludmEuciIsImludnAud2lwcC5pbnZwLnciLCJpbnZwLndpcHAuaW52cC5yIl0sImlzcyI6InVybjpjb206dGQ6YXBpOm9hdXRoMjp2MSIsImF1ZCI6InVybjpjb206dGQ6YXBpOmdhdGV3YXk6c2VjdXJpdHk6djEiLCJqdGkiOiJIaENPRmxvS3BHemo0WjVXZ1hUMkxCSmd6bmFIOHJ2M2Rzb1MifQ.KPrYRFqR2heslLpGMF6gnLa3NpzUbguqwY-y67ibzJnuZ7Tiuqo9hTYHTDmFaLyrexTEG975OJjyedE36pclniMK9zAqbNmU-R8vtjpXKmWGUx9RVRIKNC3dtt0hBOik6qkK514qp6mXXQuLFDWNaB5JpPjPjqpuX0q0nD8ZcRGgcPcTQqfg6kUdCu6S8c97nDV13qcX5YOzHrEGQEtGHsjdTE4c8xD6zrJYkB1gWDR7nG_FhPJmo-ludmrHz08nkyS6aPD9fksWYw7d1-TGSMHMGaeqgL_hZAz9YV30mUIuuNbFXyMIZybqskuXIzurWuM9VqlEpgUKU9OPjb31pw',
      'Content-Type': 'application/json'
    },
    requests: [
      {
        method: 'POST', // this should be a post for logging in
        path: '/v1/retirementGoals',
        headers: {},
        body: JSON.stringify({
          "retirementGoal" : {
            "statusCd" : "WIP",
            "nickname" : "Nick name",
            "partyId" : "9E34F3AC",
            "lifeExpectancyQty" : 85,
            "includeCPPInd" : false,
            "includeOASInd" : false,
            "includeQPPInd" : false,
            "inflationRate" : 0.02,
            "beforeRetirementTaxRate" : 0,
            "annualRateIncreasePct" : 0,
            "beforeRetirementROIRate" : 0,
            "afterRetirementROIRate" : 0.04,
            "roiRate" : 0.2,
            "retirementAgeQty" : 65,
            "currentAgeQty" : 40,
            "currentAnnualIncomeAmt" : 60000,
            "startingAmt" : 9000,
            "extraOneTimeDepositAmt" : 4000,
            "retirementLifestylePct" : 0.75,
            "additionalRetirementIncomeAmt" : 5600,
            "expectedAnnualRetirementIncomeAmt" : 1000000
          }
        })
      }
    ]
  }, finishedBench);

  function finishedBench (err, res) {
    console.log('finished bench', err, res)
  }
}