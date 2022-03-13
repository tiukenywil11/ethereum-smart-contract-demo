// SPDX-License-Identifier: MIT

pragma solidity ^0.4.26;

contract ArrayTest {
    
    // This is a Solidity snippet testing how arrays work

    // Initialize a dynamic array with uint values
    // Does not return the whole array when deployed, needs to input index when getting called
    uint[] public myArray;
	/* Dynamic string array is not supported by Solidity yet
	string[] public myArrayString;
	*/

    constructor () {
        myArray.push(1);
        myArray.push(10);
        myArray.push(30);
		/* Dynamic string array is not supported by Solidity yet
        myArrayString.push("hi");
		*/
    }

    // This function returns the whole array, compared to line 11
    function getMyArray() public view  returns (uint[] memory) {
        return myArray;
    }

	/*
    -- This function won't compile giving a TyprError
    function getMyArrayString() public view  returns (string[] memory) {
        return myArrayString;
    }
	*/
	
    function getArrayLength() public view returns (uint) {
        return myArray.length;    
    }

    function getFirstElement() public view returns (uint) {
        return myArray[0];
    }

}