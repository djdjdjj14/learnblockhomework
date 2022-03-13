const hre = require("hardhat");

async function main() {

  const Vault = await hre.ethers.getContractFactory("GLDToken");
  const va = await Vault.deploy(10^18);

  await va.deployed();

  console.log("Vault deployed to:", va.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });