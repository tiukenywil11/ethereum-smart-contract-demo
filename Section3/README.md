# Instructions on how to use

## Quick note
You can use the same instructions for both directories in this repository:
- lottery: Uses Solidity version 0.4.26
- remix-contracts: Uses Solidity version 0.4.26: solidity code snippets, and demo

## Install the following
- NodeJS (https://nodejs.org/en/download/)
- Metamask (https://metamask.io/download/)

## How to deploy and test the smart contract using JavaScript

1. Go inside the lottery directory.

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
4. Copy Copy and paste the contents of 'Lottery.sol' on the repository
5. Go to the 'Deploy and Run' button on the left tab
6. Choose the 'Environment' as 'Injected Web3 (Rinkeby)'
7. Choose the 'Account' with enough ETH currency
8. On 'at address', input the address that was shows after running 'deploy.js'
9. A box with text box will be shown below.

### Functions
- manager: Shows the manager, which is the creator's address.
- players: List of players, can call individually by calling with the index.
- enter: Adds the player's address to the lottery's list of players.
- pickWinner: Picks the winner of the lottery, transfers all the contract's balance to one of the player's on the player list.
- getPlayers: Returns the list of players in the lottery.
- getContractBalance: Returns the prize pool of the lottery.