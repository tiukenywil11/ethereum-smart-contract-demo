// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    // adding 'payable' to the variable type
    // only 'address payable' have access to the web3 'transfer' method
	address payable[] public players;

    // msg is a global variable that includes data from transaction.
    constructor () payable{
        manager = msg.sender;
    }
	
	function enter() public payable {
        // require is a function that checks for requirements, before executing a function
        // require the sender to send at least 0.1 ether to enter.
        require(msg.value > .01 ether);
        // explicitly parsed 'msg.sender' to 'payable(msg.sender)'
		players.push(payable(msg.sender));
	}

    // helper function that creates a random number
    function random() private view returns (uint) {
        // sha3() & keccak256() are the same hash function
        // takes block difficult, current time, and list of players as parameters
        // parse the hash to uint, for the return type
        // added abi.encodePacked, to fix breaking change for Solidity version 8.9
        // 'now' is deprecated has been replaced with 'block.timestamp'
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));  
    }

    function pickWinner() public restricted{
        /*
        -- require the creator of the contract to be the only one to trigger pickWinner function
        -- replaced by function modifier 'restricted'
        require(msg.sender == manager);
        */
        // Use the random function to create a very large number, then use modulo to limit the number to the number of players
        uint index = random() % players.length;
        // Use transfer(this.balance), parameter stating that all the balance in this contract will be transferred, to the address of player chosen. 
        // parse 'this' to 'address(this)' to explicitly convert contract type to address
        players[index].transfer(address(this).balance);
        // Re-initialize a new dynamic array to reset the contract, and also have an initial size of 0
        // changed 'address' to type 'address payable'
        players = new address payable[](0);
    }

    /*
    -- sample function using 'restricted' function modifier as well.
    function returnEntries() public restricted{

    }
    */

    // modifiers are used to prevent 'don't repeat yourself' problem
    // Create a modifier named restricted, that can be called on a function
    modifier restricted() {
        // require the creator of the contract to be the only one to trigger pickWinner function
        require(msg.sender == manager);
        // the underscore will be replaced with the code blocks inside the function it is called upon
        _;
    }

    // view modifier only returns read-only data.
    // function returns list of players in the array
    // adding 'memory' to returns to indicate that change can take place within the contract.
    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }

    // function returns the balance in the contract 
    function getContractBalance() public view returns(uint256) {
        // parse 'this' to 'address(this)' to explicitly convert contract type to address
        return address(this).balance;
    }

}
