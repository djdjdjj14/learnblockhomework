let { ethers } = require("hardhat");
//let { writeAddr } = require('./artifact_log.js');

async function main() {
    // await run('compile');
    let [owner, second] = await ethers.getSigners();

    let tAmount = ethers.utils.parseUnits("500", 18);

    let MyTokenMarket = await ethers.getContractFactory("MyTokenMarket");

    /*
    let routerAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    let wethAddr = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
    let masterchefAddr = "0x80C7DD17B01855a6D2347444a0FCC36136a314de"
    */

    let masterchefAddr = "0x65b0C34A3ad8EBd198D4AB36511C724F6Fbb71De";
    let atokenaddr = "0xBAaC2edb7d60752bDC35B19304e063b9e797AD69";
    let marketaddr = "0x6B907b27DFD7697D8E0FB671FA9430b04e3AB3CA";
    let chef = await hre.ethers.getContractAt("MasterChef",masterchefAddr);
    let atoken = await hre.ethers.getContractAt("Token",atokenaddr);
    let market = await hre.ethers.getContractAt("MyTokenMarket",marketaddr);


    await atoken.approve(market.address, ethers.constants.MaxUint256);
    await atoken.approve(masterchefAddr, ethers.constants.MaxUint256);
    //await sushicoin.approve(market.address, ethers.constants.MaxUint256);
    //await sushicoin.approve(masterchefAddr, ethers.constants.MaxUint256);
    console.log("start")

    /*
    await chef.add(100, atoken.address, true);
    let poolinfo = await chef.poolInfo(0);
    console.log(poolinfo);
    */

    let ethAmount = ethers.utils.parseUnits("0.001", 18);
    await market.AddLiquidity(tAmount, { value: ethAmount })
    console.log("添加流动性");

    let b = await atoken.balanceOf(owner.address);
    console.log("持有token:" + ethers.utils.formatUnits(b, 18));

    let buyEthAmount = ethers.utils.parseUnits("0.01", 18);
    out = await market.buyToken("0", { value: buyEthAmount })

    b = await atoken.balanceOf(masterchefAddr);
    console.log("购买到:" + ethers.utils.formatUnits(b, 18));

    let award = await chef.pendingSushi(0, market.address);
    console.log("预期收益： ",award);

    await market.withdraw(ethers.utils.parseUnits("1000", 18));
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