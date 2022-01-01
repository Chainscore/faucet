const TestToken = artifacts.require("TestToken");
const Faucet = artifacts.require("Faucet");


const {
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
    time
  } = require('@openzeppelin/test-helpers');

contract("Faucet", accounts => {

    let token;
    let faucet;

    before(async () => {
        token = await TestToken.deployed();
        faucet = await Faucet.deployed();
    })

    it("fund faucet", async () => {
        await token.transfer(faucet.address, web3.utils.toWei("10000000"));
    })

    it("should pass request", async () => {
        await faucet.request({from : accounts[1]});
        expect(web3.utils.fromWei(await token.balanceOf(accounts[1]))).to.equal("100");
    })

    it("should fail request due to time limit", async () => {
        expectRevert(faucet.request({from : accounts[1]}), "Token Limit");
    })

    it("should fail request due to token limit", async () => {
        await time.increase(100);
        expectRevert(faucet.request({from : accounts[1]}), "Token Limit");
    })


    it("should pass after 10 sec", async () => {
        await token.transfer(accounts[2], web3.utils.toWei("100"), {from: accounts[1]});
        expect(web3.utils.fromWei(await token.balanceOf(accounts[1]))).to.equal("0");

        await faucet.request({from : accounts[1]});
        expect(web3.utils.fromWei(await token.balanceOf(accounts[1]))).to.equal("100");
    })
})