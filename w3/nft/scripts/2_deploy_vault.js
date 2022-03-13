
const hre = require("hardhat");

async function main() {

  const Vault = await hre.ethers.getContractFactory("Vault");
  const va = await Vault.deploy("0x3DA18d5b85bdA5cb8f6758319E8b311EB5085517");

  await va.deployed();

  console.log("Vault deployed to:", va.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
