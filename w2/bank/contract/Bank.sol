// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    bool private locked;
    address private owner = msg.sender;
    mapping(address => uint) private account;
    mapping(address => string) private psword;

    modifier noReentrancy() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function logon(string memory psw) external {
        require(bytes(psw).length!=0,"please set password");
        psword[msg.sender]=psw;
    }

    function viewbalance(string memory psw) external view returns(uint balance){
        require(keccak256(bytes(psword[msg.sender]))==keccak256(bytes(psw)),
          "password is not correct");      
        return account[msg.sender];
    }

    function savemoney() external payable{
        require(bytes(psword[msg.sender]).length!=0,"please log on first");
        account[msg.sender]+=msg.value;//safemath
    }

    function withdraw(string memory psw,uint coin) external payable noReentrancy {
        require(keccak256(bytes(psword[msg.sender]))==keccak256(bytes(psw)),
          "password is not correct");
        require(account[msg.sender]>=coin,
          "Sorry, your credit is running low");
        (bool success, ) = msg.sender.call{value: coin*1 ether}("");
        account[msg.sender] = account[msg.sender]-coin*1 ether;//safemath
        require(success, "Failed to send Ether");
    }

    function withdrawall() external payable onlyOwner {
        uint amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {
        require(bytes(psword[msg.sender]).length!=0,"please log on first");
        account[msg.sender]+=msg.value;//safemath
    }
}