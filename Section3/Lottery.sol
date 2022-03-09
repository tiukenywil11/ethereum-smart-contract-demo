pragma solidity ^0.4.26;

contract Lottery {
    address public manager;
	address[] public players;

    // msg is a global variable that includes data from transaction.
    constructor () public payable{
        manager = msg.sender;
    }
	
	function enter() public payable {
        // require is a function that checks for requirements, before executing a function
        // require the sender to send at least 0.1 ether to enter.
        require(msg.value > .01 ether);
		players.push(msg.sender);
	}
}