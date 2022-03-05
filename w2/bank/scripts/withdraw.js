const hre = require("hardhat");

async function main() {
    let accountlist = await hre.ethers.getSigners();
    let bankaddr = "0xbCe05C598E1426D06EF2D430f8411C7301fC74F0";
    let bank = await hre.ethers.getContractAt("Bank",bankaddr);
    let accbalance = await bank.connect(accountlist[9]).viewbalance("123456");
    console.log("account ",accountlist[9].address, accbalance);
    try{await bank.connect(accountlist[9]).withdrawall();}
    finally{await bank.connect(accountlist[0]).withdrawall();}
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});