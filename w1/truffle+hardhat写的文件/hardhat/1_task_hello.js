task("helcount", "say hello and count")
.addParam("address", "require hellotx addr")
.setAction(async (taskArgs) => {
    const conaddr = taskArgs.address;
    let hello = await ethers.getContractAt("hello", conaddr);
    let hel = await hello.hel();
    let counterv = await hello.counter();
    console.log(hel);
    console.log("cur value:" + counterv);
});