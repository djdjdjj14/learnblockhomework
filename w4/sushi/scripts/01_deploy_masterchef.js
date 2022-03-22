const { ethers, network } = require("hardhat");

//const { writeAddr } = require('./artifact_log.js');

let sushicoinaddr = "0x8A3FD2FE4e9b0DCf80D1e3Aa0a410b22ec26AD56";
async function main() {
  let [owner]  = await ethers.getSigners();
  
  Chef = await ethers.getContractFactory("MasterChef");
  chef = await Chef.deploy(sushicoinaddr, owner.address, "1000000000000000000000", "0", "1000000000000000000000");
  await chef.deployed();

  console.log("chef address: ", chef.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

