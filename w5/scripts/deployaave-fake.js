let { ethers } = require("hardhat");

async function main() {

    let Aave = await ethers.getContractFactory("TestAaveFlashLoan");
    //let aAmount = ethers.utils.parseUnits("1000000", 18);
    const ADDRESS_PROVIDER = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5";
    let f = await Aave.deploy(ADDRESS_PROVIDER);
    await f.deployed();
    console.log("aaveflashlaon address: ", f.address);

    const atoken = "0x49c4441b010F6dBB321E4fd2C24E866FD187b93C";
    const btoken = "0x561aAfE447cCb7Ace2E71E85Ef7F36695f215a27";
    const acont = await hre.ethers.getContractAt("Token",atoken);
    const bcont = await hre.ethers.getContractAt("Token",btoken);
    await acont.approve(f.address,1000000);
    await bcont.approve(f.address,1000000);
    await acont.transfer(f.address,100);
    //await bcont.transfer(f.address,100);

    await f.testFlashLoan(atoken,80);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });