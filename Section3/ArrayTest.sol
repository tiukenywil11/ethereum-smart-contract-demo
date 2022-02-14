contract ArrayTest {
    
    // This is a Solidity snippet testing how arrays work

    // Initialize a dynamic array with uint values
    // Does not return the whole array when deployed, needs to input index when getting called
    uint[] public myArray;

    constructor() {
        myArray.push(1);
        myArray.push(10);
        myArray.push(30);
    }

    // This function returns the whole array, compared to line 7
    function getMyArray() public view  returns (uint[] memory) {
        return myArray;
    }
 
    function getArrayLength() public view returns (uint) {
        return myArray.length;    
    }

    function getFirstElement() public view returns (uint) {
        return myArray[0];
    }

}