var hello = artifacts.require("hello");


contract("hello", function(accounts) {
    var conterinstance;
    it("this will say hello", function() {
        return hello.deployed()
            .then(function(instance) {
                conterinstance = instance;
                return conterinstance.sayhello();
            }).then(function() {
                return conterinstance.hel();
            }).then(function(hell) {
                assert.equal(hell, "hello world");
            });
    });
});
