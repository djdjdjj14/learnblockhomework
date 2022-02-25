const hre = require("hardhat");

async function main() {
  const Hello = await hre.ethers.getContractFactory("hello");
  const hello = await Hello.deploy();
  await hello.deployed();
  console.log("hello deployed to:", hello.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });