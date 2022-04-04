# Instructions on how to use

## Install the following
- NodeJS (https://nodejs.org/en/download/)
- Metamask (https://metamask.io/download/)

## Quick note: Smart contract
You can use the same instructions for both directories in this repository:
- lottery: Uses Solidity version 0.4.26
- lottery-updated: Uses Solidity version 0.8.9

### How to deploy and test the smart contract using JavaScript

1. Go inside the lottery directory.

#### Compiling the smart contract
```bash
node compile.js
```

#### Using mocha to test the contract
```bash
npm run test
```

#### Deploying the contract
```bash
node deploy.js
```

#### Check if contract has been deployed on the following link
- https://rinkeby.etherscan.io/address/0xe33cf08406fdb46eaeaa9cc702fdad54a076c709

#### Interacting with the deployed contract
1. Create a Metamask account if not already existing.
2. Go to https://faucets.chain.link/rinkeby, and input your wallet's public key to get free testnet LINK, and ETH (for gas fee).
3. Go to https://remix.ethereum.org/
4. Copy Copy and paste the contents of 'Lottery.sol' on the repository
5. Go to the 'Deploy and Run' button on the left tab
6. Choose the 'Environment' as 'Injected Web3 (Rinkeby)'
7. Choose the 'Account' with enough ETH currency
8. On 'at address', input the address that was shows after running 'deploy.js'
9. A box with text box will be shown below.

#### Functions
- manager: Shows the manager, which is the creator's address.
- players: List of players, can call individually by calling with the index.
- enter: Adds the player's address to the lottery's list of players.
- pickWinner: Picks the winner of the lottery, transfers all the contract's balance to one of the player's on the player list.
- getPlayers: Returns the list of players in the lottery.
- getContractBalance: Returns the prize pool of the lottery.

## Quick note: front end (ReactJS)
- lottery-react: Uses react version 18, and react scripts version 4.0.3

### How to run ReactJS front end

1. Go in the 'lottery-react' directory.

#### Initialize dependencies
```code
npm init
```

#### Start the front end (development environment)
```code
npm start
```

### Access the following link for the front end UI

- http:localhost:3000

### Close the server
1. Go the command line where 'npm start' was ran.
2. Press the following keyboard keys together'CTRL+C'.
