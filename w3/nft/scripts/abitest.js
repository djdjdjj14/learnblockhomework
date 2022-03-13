//import erc20Abi from '/ERC20Token.json'
const fs = require('fs');
//const selfwallet = fs.readFileSync(".secret").toString().trim();
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  provider = accounts[0];
  var abi = fs.readFileSync("./scripts/ERC20Token.json").toString().trim();
  var addr = "0x3DA18d5b85bdA5cb8f6758319E8b311EB5085517";
  var contract = new ethers.Contract(addr, abi, provider);
  
  await contract.mint(accounts[0].address, 50)
    .then(function(tx) {
    console.log(tx);
  });
  
  var number = await contract.balanceOf(accounts[0].address);
  console.log(number)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
