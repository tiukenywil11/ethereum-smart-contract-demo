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

    // checks multiple accounts can be entered
    it('allows multiple accounts to enter', async () => {
        // calls the method enter in Lottery.sol
        // chain with send, with the parameters (from: sender wallet address, value: ether value that will be sent to the contract).
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        // uses the second account in ganache test environment
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        // uses the second account in ganache test environment
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        // get the list of players in the accounts array, to check if account has been created
        // call function getPlayers for the list of arrays
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // assert if index 0 accounts (variable in test script) is the same as index 0 players (variable inside the contract)
        assert.equal(accounts[0], players[0]);
        // assert if index 1 accounts (variable in test script) is the same as index 0 players (variable inside the contract)
        assert.equal(accounts[1], players[1]);
        // assert if index 2 accounts (variable in test script) is the same as index 0 players (variable inside the contract)
        assert.equal(accounts[2], players[2]);

        // assert if the array was initialized with 3 values
        assert.equal(3, players.length);
    });

    // checks if the minimum amount of ether is provided to use the enter function
    it('requires a minimum amount of ether to enter', async () => {
        
        // use a try catch statement to return an error
        try {
            // calls method enter at Lottery.sol
            // uses the first account in ganache test environment
            // passing value 0 ether
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });

            // if the await function above succeeds, add an extra assert to make sure that the test fails
            assert(false);

        } catch (err) {
            // assert checks for truthiness, while assert.ok checks for existence
            // assert() assures us that a value is passed inside the function
            assert(err);
        }
    });

    // tests modifier where only the contract creator can call a function
    it('only manager can call pickWinner', async() => {

        // use a try catch statement to return an error
        try{
            // calls methods pickWinner from Lottery.sol
            // uses the second account, which is not the manager
            await lottery.methods.enter().send({
                from: accounts[1]
            });

            // if the await function above succeeds, add an extra assert to make sure that the test fails
            assert(false);

        } catch (err) {
        
            // assert() assures us that a value is passed inside the function
            assert(err);
        }

    });

    // checks if the contract gives the reward to the winner, and resets players count
    // will check by only entering one player, eliminating the random nature of the program for testing
    it('sends money to the winner, resets the players array, and contract balance must be zero', async() => {

            // calls method enter at Lottery.sol
            // uses the first account in ganache test environment
            // passing a value of two quintillion wei, using a web3 utility called toWei putting the parameters two, and ether
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('2', 'ether')
            });

            // check if the function works, by checking the balance of the first account, before and after using the pickWinner function 
            
            // get initial balance of the first account, by using web3 function getBalance
            // balance by this point would be two ether and gas fees less 
            const initialBalance = await web3.eth.getBalance(accounts[0]);

            // calls methods pickWinner from Lottery.sol
            // uses the first account in ganache test environment
            // this should return the ether to the first account, because it is the only player
            await lottery.methods.pickWinner().send({ 
                from: accounts[0] 
            });

            // get final balance of the first account, by using web3 function getBalance
            // balance by this point should be the same as before entering with two ether, minus the gas fee
            const finalBalance = await web3.eth.getBalance(accounts[0]);
            
            // get the difference between initial and final balance, to check if the contact was successful
            const difference = finalBalance - initialBalance;
            // asserts the the difference is less than two ether (because of the gas fees), but close to two ether
            assert(difference > web3.utils.toWei('1.8', 'ether')) 

            // homework 1: assert that player arrays gets emptied out

            // get the list of players in the accounts array, to check if account is empty after calling pickWinnner
            // call function getPlayers for the list of arrays
            const players = await lottery.methods.getPlayers().call({
                from: accounts[0]
            });

            //  assert if the array was has 0 values after the winners are picked
            assert.equal(0, players.length);

            // homework 2: assert that lottery amount goes back to zero

            // get balance of contract
            const contractBalance = await lottery.methods.getContractBalance().call({
                from: accounts[0]
            });

            //  assert that the contract balance has 0 wei after pickWinner is called
            assert.equal(0, contractBalance);
    });

});

