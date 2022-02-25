pragma solidity ^0.8.0;
contract hello {
    function sayhello() public pure returns (string memory){
        return ("hello world");
    }
    uint public counter;
    constructor(){
        counter=0;
    }
    function count() public {
        counter=counter+1;
    }
}