const hre = require("hardhat");

async function main() {
  const Teacher = await hre.ethers.getContractFactory("Teacher");
  const teacher = await Teacher.deploy();
  await teacher.deployed();
  const Score = await hre.ethers.getContractFactory("Score");
  const score = await Score.deploy(teacher.address);
  await score.deployed();
  console.log("Teacher deployed to:", teacher.address);
  console.log("Score deployed to:", score.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});