let { ethers } = require("hardhat");
//let { writeAddr } = require('./artifact_log.js');

async function main() {
    // await run('compile');
    let [owner, second] = await ethers.getSigners();

    let aAmount = ethers.utils.parseUnits("100000", 18);
    let tokenaaddr = ""
    let tokena = await hre.ethers.getContractAt("Token",teacheraddr);

    await atoken.deployed();
    console.log("AToken:" + atoken.address);

    let MyTokenMarket = await ethers.getContractFactory("MyTokenMarket");

    let routerAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    let wethAddr = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

    let market = await MyTokenMarket.deploy(
        atoken.address,
        routerAddr,
        wethAddr,
    );

    await market.deployed();
    console.log("market:" + market.address);

    await atoken.approve(market.address, ethers.constants.MaxUint256);
    console.log("start")

    let ethAmount = ethers.utils.parseUnits("0.1", 18);
    await market.AddLiquidity(aAmount, { value: ethAmount })
    console.log("添加流动性");

    let b = await atoken.balanceOf(owner.address);
    console.log("持有token:" + ethers.utils.formatUnits(b, 18));

    let buyEthAmount = ethers.utils.parseUnits("0.1", 18);
    out = await market.buyToken("0", { value: buyEthAmount })

    b = await atoken.balanceOf(owner.address);
    console.log("购买到:" + ethers.utils.formatUnits(b, 18));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });