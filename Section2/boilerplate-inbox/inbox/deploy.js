const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'whip brass stay lift tunnel river fun double that drive tiny truly',
    'https://rinkeby.infura.io/v3/b6e6453ddb70482fa929f285c9202893'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There'] })
        .send({ gas: '1000000', from: accounts[0] });

    
};
deploy();