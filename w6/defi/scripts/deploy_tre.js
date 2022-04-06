const hre = require("hardhat");

async function main() {

  const accounts = await hre.ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("Treasury");
  let govaddr = "0x10d38a40465F6061BDE9231B786dc9a42eBac2Bf";
  const token = await Token.deploy(govaddr);

  await token.deployed();

  console.log("tre deployed to:", token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });