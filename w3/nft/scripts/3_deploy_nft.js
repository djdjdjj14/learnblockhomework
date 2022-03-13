const hre = require("hardhat");

async function main() {

  const Nft = await hre.ethers.getContractFactory("Mydnft");
  const nft = await Nft.deploy();

  await nft.deployed();

  console.log("Mydnft deployed to:", nft.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });