pragma solidity ^0.8.0;
contract hello {
    string public hel;
    function sayhello() public returns (string memory){
        hel = "hello world";
        return (hel);
    }
    uint public counter;
    constructor(){
        counter=0;
    }
    function count() public {
        counter=counter+1;
    }
}