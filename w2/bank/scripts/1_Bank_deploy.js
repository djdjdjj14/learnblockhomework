const hre = require("hardhat");

async function main() {
  const Bank = await hre.ethers.getContractFactory("Bank");
  const accountlist = await ethers.getSigners();
  const bank = await Bank.deploy();
  console.log("owner: ", accountlist[0].address);
  await bank.connect(accountlist[0]).deployed();
  console.log("Bank deployed to:", bank.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});