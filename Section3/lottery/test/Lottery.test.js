const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

// declare variable for contract
let lottery;
// declare variable for list of accounts
let accounts;

// getting data from the blockchain requires asyn, because there will be delays
beforeEach( async () => {
    // get accounts by using ganache's ethereum module getAccounts, returns all accounts in ganache test server.
    accounts = await web3.eth.getAccounts();

    // Contract will pass in the interface, as soon as it is parsed to JSON 
    // chaining deploy and passing the bytecode
    // chaining send taking in parameter of the account to send from, and the gas willing to be used
    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: '1000000' });

});

