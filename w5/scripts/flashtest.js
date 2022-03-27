const hre = require("hardhat");

async function main() {
  const Tuni = await hre.ethers.getContractFactory("TestUniswapFlashSwap");
  const tuni = await Tuni.deploy();
  const atoken = "0x49c4441b010F6dBB321E4fd2C24E866FD187b93C";
  const btoken = "0x561aAfE447cCb7Ace2E71E85Ef7F36695f215a27";
  const acont = await hre.ethers.getContractAt("Token",atoken);
  const bcont = await hre.ethers.getContractAt("Token",btoken);

  await tuni.deployed();

  console.log("Tuni deployed to:", tuni.address);

  await acont.approve(tuni.address,1000000);
  await bcont.approve(tuni.address,1000000);
  console.log("approve ok");

  await tuni.testFlashSwap(atoken,10,{gasLimit:2000000});
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });