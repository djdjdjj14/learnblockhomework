
const hre = require("hardhat");

async function main() {
    let accountlist = await hre.ethers.getSigners();
    let nftaddr = "0x91FF2D123EEa6DFb42DAEFBc7F3c802b7c6Acc14";
    let testnft = await hre.ethers.getContractAt("Mynft",nftaddr);
    let tokenurl = "https://ipfs.io/ipfs/Qmf8CVNGB3NoMEQHCNrtv3RDAQybFToX6AzgnX11ouiK9W";

    /*
    await testnft.awardItem(accountlist[0].address,tokenurl)
      .then(function(_,nftid){
        console.log(nftid)
      });
    */
   await testnft.
    
    await testnft.balanceOf(accountlist[0].address)
      .then(function(nftnum){
        console.log(nftnum)
      });
    
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});