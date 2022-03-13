const hre = require("hardhat");

async function main() {
    //let accountlist = await hre.ethers.getSigners();
    let nftaddr = "0x109CC975D928A31A89A08a0273b840f6f680A31C";
    let testnft = await hre.ethers.getContractAt("GLDToken",nftaddr);
    //let tokenurl = "https://ipfs.io/ipfs/Qmf8CVNGB3NoMEQHCNrtv3RDAQybFToX6AzgnX11ouiK9W";

    //console.log(accountlist[0].address)
    let myaddr = "0x0C579BdAca0C582d437D0C78b4e2aCC6c45aD435";
    await testnft.awardItem(myaddr,tokenurl);
    
    await testnft.balanceOf(myaddr)
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