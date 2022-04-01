// lottery.js create a local instance of the smart contract deployed on the blockchain

// import web3 library to interact with metamask wallet
import web3 from './web3';

// smart contract address for lottery contract
// tranasaction that created this contract: https://rinkeby.etherscan.io/tx/0x524db5af3bb77aa04e73ea77b1331a5d02cc8d49329e57c280a5bfa0d9a0d482
const address = '0x1c1d6143846d2b9536f5d621cbbc12e235e928ab'

// abi is the description of the smart contract interface, needs bytecode to run
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "manager",
        "outputs": [
        {
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
        {
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPlayers",
        "outputs": [
        {
            "name": "",
            "type": "address[]"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
        {
            "name": "",
            "type": "uint256"
        }],
        "name": "players",
        "outputs": [
        {
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    }
];

// create and export a local instance of the lottery contract
export default new web3.eth.Contract(abi, address);