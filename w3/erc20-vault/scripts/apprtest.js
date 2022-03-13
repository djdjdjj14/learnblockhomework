
const hre = require("hardhat");

async function main() {
    let accountlist = await hre.ethers.getSigners();
    let ercaddr = "0x3DA18d5b85bdA5cb8f6758319E8b311EB5085517";
    let vauaddr = "0x456468B2330100046436d95d93C60eb73Dc3A3F2";
    let coin = await hre.ethers.getContractAt("ERC20Token",ercaddr);
    let vault = await hre.ethers.getContractAt("Vault",vauaddr);
    
    await coin.balanceOf(accountlist[0].address)
      .then(function(num){
          console.log(num);
    });
    await coin.approve(vauaddr,10);
    await vault.deposit(accountlist[0].address,10);
    
    await coin.balanceOf(accountlist[0].address)
      .then(function(num){
          console.log(num);
    });
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});