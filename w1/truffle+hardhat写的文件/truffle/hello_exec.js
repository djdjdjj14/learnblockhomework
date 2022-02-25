var hello = artifacts.require("hello");

module.exports = async function(callback) {
    let hell = await hello.deployed();
    await hell.count();
    let value = await hell.counter();
    console.log("value:" + value); 

    await hell.sayhello();
    let say = await hell.hel();
    console.log(say)
}