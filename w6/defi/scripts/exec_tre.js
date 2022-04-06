let { ethers } = require("hardhat");

async function main() {
    // await run('compile');
    let [owner, second] = await ethers.getSigners();

    let govaddr = "0x10d38a40465F6061BDE9231B786dc9a42eBac2Bf";
    let treaddr = "0xe6df0E258841F13098689a2DfD93d20A48A25a6F";
    let gov = await hre.ethers.getContractAt("MultiSigWallet",govaddr);
    let tre = await hre.ethers.getContractAt("Treasury",treaddr);

    
    let m = await tre.getDatawithdraw(5);
    //console.log(m);
    await gov.submitTransaction(treaddr,0,m);
    let num = await gov.getTransactionCount();
    console.log(num);
    
    await gov.confirmTransaction(0);
    console.log("confirm ok");
    
    await gov.executeTransaction(0);
    console.log("exec ok");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });