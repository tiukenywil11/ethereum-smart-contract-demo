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

// describe categorizes the tests as part of 'Lottery Contract'
describe('Lottery Contract', () => {
    
    // checks if contracts gets deployed
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    // checks if an account can be entered
    it('allows one account to enter', async () => {
        // calls the method enter in Lottery.sol
        // chain with send, with the parameters (from: sender wallet address, value: ether value that will be sent to the contract).
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        // get the list of players in the accounts array, to check if account has been created
        // call function getPlayers for the list of arrays
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // assert if index 0 accounts (variable in test script) is the same as index 0 players (variable inside the contract)
        assert.equal(accounts[0], players[0]);

        // assert if the array was initialized with only 1 value
        assert.equal(1, players.length);

    });

});

