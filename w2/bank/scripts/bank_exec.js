
const hre = require("hardhat");

async function main() {
    let accountlist = await hre.ethers.getSigners();
    let bankaddr = "0xbCe05C598E1426D06EF2D430f8411C7301fC74F0";
    let bank = await hre.ethers.getContractAt("Bank",bankaddr);
    await bank.connect(accountlist[1]).logon("123456");
    await bank.connect(accountlist[9]).logon("123456");
    await bank.connect(accountlist[1]).savemoney({value: 
        ethers.utils.parseEther('5')});
    let accbalance = await bank.connect(accountlist[1]).viewbalance("123456");
    console.log("account ",accountlist[1].address, accbalance);
    await bank.connect(accountlist[1]).withdraw("123456",3);
    accbalance = await bank.connect(accountlist[1]).viewbalance("123456");
    console.log("account ",accountlist[1].address, accbalance);
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});