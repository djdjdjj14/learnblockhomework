// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Score {
    address private teacher;
    mapping(address => uint) private scorelist;

    constructor(address t) {
        teacher = t;
    }

    modifier onlyteacher {
        require(msg.sender == teacher);
        _;
    }

    function viewscore() external view returns(uint) {
        require(scorelist[msg.sender] != 0,"no score!");
        return scorelist[msg.sender];
    }

    function changescore(address stu, uint sco) external onlyteacher {
        require(sco <= 100, "no more than 100!");
        scorelist[stu] = sco;
    }
}

interface IScore {
    function changescore(address stu, uint sco) external;
    //function viewscore() external view returns(uint);
}

contract Teacher {
    function givescore(address scoaddr, address stuaddr, uint sco) external {
        IScore scochanger = IScore(scoaddr);
        scochanger.changescore(stuaddr, sco);
    }
}
