const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
// 'abi' means 'application binary interface', which replaces 'interface'
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'whip brass stay lift tunnel river fun double that drive tiny truly',
    'https://rinkeby.infura.io/v3/b6e6453ddb70482fa929f285c9202893'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
	// Removed arguments on deploy, because lottery contract does not take arguments 
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '1000000', from: accounts[0] });

    // get the interface to pass to the front end
    console.log(abi);
    // get the contract address to pass to the front end
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();