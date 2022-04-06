const hre = require("hardhat");

async function main() {

  const accounts = await hre.ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("MultiSigWallet");
  
  var owners = new Array();
  owners[0]=accounts[0].address;
  owners[1]=accounts[1].address;
  owners[2]=accounts[2].address;

  const token = await Token.deploy(owners,1);

  await token.deployed();

  console.log("gov deployed to:", token.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });