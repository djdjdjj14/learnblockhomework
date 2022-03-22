let { ethers } = require("hardhat");
//let { writeAddr } = require('./artifact_log.js');

async function main() {
    // await run('compile');
    let [owner, second] = await ethers.getSigners();

    /*
    let routerAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    let wethAddr = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    let masterchefAddr = "0x80C7DD17B01855a6D2347444a0FCC36136a314de"
    */
    let masterchefAddr = "0x1dCD1724F18a4cD75a5B3FBAAcf3EB33384C8452";
    let atokenaddr = "0x68F2FB96715A9F24a904c06Db53CD2A0Fe407083";
    let marketaddr = "0xf893521215B6B7fcCa048Ce99160786a9b03cF88";
    let market = await hre.ethers.getContractAt("MyTokenMarket",marketaddr);
    let atoken = await hre.ethers.getContractAt("Token",atokenaddr);
    let chef = await hre.ethers.getContractAt("MasterChef",masterchefAddr);

    let b = await atoken.balanceOf(chef.address);
    console.log("现在：",ethers.utils.formatUnits(b, 18));

    let award = await chef.pendingSushi(0, market.address);
    console.log("预期收益： ",ethers.utils.formatUnits(award, 18));

    await market.withdraw(ethers.utils.parseUnits("100", 18));
    console.log("取钱");

    b = await atoken.balanceOf(owner.address);
    console.log("现在：",ethers.utils.formatUnits(b, 18));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });