let { ethers } = require("hardhat");

async function main() {
    // await run('compile');
    let [owner, second] = await ethers.getSigners();

    let Token = await ethers.getContractFactory("CallOptToken");
    let aAmount = ethers.utils.parseUnits("0.1", 18);
    let usdcaddr = "0xeb8f08a975Ab53E34D8a0330E0D34de942C95926";
    let atoken = await Token.deploy(usdcaddr);

    await atoken.deployed();
    console.log("AToken:" + atoken.address);

    await atoken.mint({ value: aAmount });
    let nowam = await atoken.balanceOf(owner.address);
    console.log(nowam);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

