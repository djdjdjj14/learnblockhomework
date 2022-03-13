
const hre = require("hardhat");

async function main() {
    //let accountlist = await hre.ethers.getSigners();
    let nftaddr = "0x88b1E38D044CDD078B33Ad835512468254153467";
    let testnft = await hre.ethers.getContractAt("Mydnft",nftaddr);
    let tokenurl = "https://ipfs.io/ipfs/Qmf8CVNGB3NoMEQHCNrtv3RDAQybFToX6AzgnX11ouiK9W";

    //console.log(accountlist[0].address)
    let myaddr = "0x0C579BdAca0C582d437D0C78b4e2aCC6c45aD435";
    let toaddr = "0x1399cb7adCA8659845bc9185e019c207469600Bd";
    //await testnft.awardItem(myaddr,tokenurl);
    await testnft.transferFrom(myaddr,toaddr,2);

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