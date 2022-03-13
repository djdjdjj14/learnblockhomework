
const hre = require("hardhat");

async function main() {

  const Vault = await hre.ethers.getContractFactory("Vault");
  const va = await Vault.deploy("0x5F30929Dd04A15D672C2cd1e8f143fBb674e5E55");

  await va.deployed();

  console.log("Vault deployed to:", va.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
