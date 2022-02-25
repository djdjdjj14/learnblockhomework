const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("hello", function () {
  it("say hello and count", async function () {
    const Hello = await ethers.getContractFactory("hello");
    const hello = await Hello.deploy();
    await hello.deployed();

    const helloTx = await hello.sayhello();
    await helloTx.wait();
    expect(await hello.hel()).to.equal("hello world");

    const countTx = await hello.count();
    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    await countTx.wait();
    expect(await hello.counter()).to.equal(1);


  });
});