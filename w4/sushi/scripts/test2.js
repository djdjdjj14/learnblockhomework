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
        
    let masterchefAddr = "0x4bE464A8cB0a93237eeAa23744dd87C8a337D271";
    let atokenaddr = "0x43838E36D82c00DA35230be75Ca740c3Fe2Df562";
    let chef = await hre.ethers.getContractAt("MasterChef",masterchefAddr);
    let atoken = await hre.ethers.getContractAt("Token",atokenaddr);
    
    await chef.deposit(0,ethers.utils.parseUnits("100", 18));

    let b = await atoken.balanceOf(chef.address);
    console.log("现在：",ethers.utils.formatUnits(b, 18));

    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();
    console.log("erc20 deployed to:", token.address);

    let award = await chef.pendingSushi(0, owner.address);
    console.log("预期收益： ",ethers.utils.formatUnits(award, 18));

    await chef.withdraw(0,ethers.utils.parseUnits("100", 18));
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