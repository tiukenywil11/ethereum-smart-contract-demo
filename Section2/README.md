# Instructions on how to use

## Quick note
You can use the same instructions for both directories in this repository:
- inbox: Uses Solidity version 0.4.26
- inbox-updated: Uses Solidity version 0.8.11

## Install the following
- NodeJS (https://nodejs.org/en/download/)
- Metamask (https://metamask.io/download/)

## How to deploy and test the smart contract using JavaScript

1. Go inside any of the two directory.

### Compiling the smart contract
```bash
node compile.js
```

### Using mocha to test the contract
```bash
npm run test
```

### Deploying the contract
```bash
node deploy.js
```

### Check if contract has been deployed on the following link
- https://rinkeby.etherscan.io/address/0xe33cf08406fdb46eaeaa9cc702fdad54a076c709

### Interacting with the deployed contract
1. Create a Metamask account if not already existing.
2. Go to https://faucets.chain.link/rinkeby, and input your wallet's public key to get free testnet LINK, and ETH (for gas fee).
3. Go to https://remix.ethereum.org/
4. Copy Copy and paste the contents of 'Inbox.sol' on the repository
5. Go to the 'Deploy and Run' button on the left tab
6. Choose the 'Environment' as 'Injected Web3 (Rinkeby)'
7. Choose the 'Account' with enough ETH currency
8. On 'at address', input the address that was shows after running 'deploy.js'
9. A box with text box will be shown below.

### Functions
- message: Shows the initial or appended message in Inbox.sol contract.
- setMessage: Appends the message in Inbox.sol contract