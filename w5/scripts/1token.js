let { ethers } = require("hardhat");

async function main() {

    let Token = await ethers.getContractFactory("Token");
    let aAmount = ethers.utils.parseUnits("1000000", 18);
    let f = await Token.deploy("BToken","BKT",aAmount);
    await f.deployed();
    console.log("A address: ", f.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });