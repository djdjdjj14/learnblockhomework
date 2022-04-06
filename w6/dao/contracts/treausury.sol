//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Treasury {
    address private gov;
    uint money;

    modifier onlyOwner {
        require(msg.sender == gov);
        _;
    }

    constructor(address _gov){
        gov = _gov;
        money = 0;
    }

    receive() external payable {
        money += msg.value;
    }

    function withdraw(uint256 amount) external payable onlyOwner {
        require(amount < money);
        (bool success, ) = gov.call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    function getDatawithdraw(uint256 amount) public pure returns (bytes memory) {
        return abi.encodeWithSignature("withdraw(uint256)", amount);
    }
}