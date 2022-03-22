let { ethers } = require("hardhat");

const { writeAddr } = require('./artifact_log.js');

async function main() {
    let [owner, second] = await ethers.getSigners();

    let SushiToken = await ethers.getContractFactory("SushiToken");
    let f = await SushiToken.deploy();
    await f.deployed();
    console.log("sushitoken address: ", f.address);
    await writeAddr(f.address, "SushiToken", network.name);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });