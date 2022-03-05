const hre = require("hardhat");

async function main() {
    let accountlist = await hre.ethers.getSigners();
    let scoreaddr = "0x9F8ad2ac94BfE16F2e37553A23F659B83cD14Cd5";
    let teacheraddr = "0x51e778A996d47996B5Ab1B6077A55bCFf2cEe930";
    let score = await hre.ethers.getContractAt("Score",scoreaddr);
    let teacher = await hre.ethers.getContractAt("Teacher",teacheraddr);

    try {
        await score.connect(accountlist[1])
          .changescore(accountlist[1].address,100);
    }
    catch(err){
        console.log("error!",err);
    }
    finally{
        await teacher.connect(accountlist[1])
          .givescore(scoreaddr, accountlist[1].address, 100);
        let sco = await score.connect(accountlist[1]).viewscore();
        console.log("my score: ", sco);
    }
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});