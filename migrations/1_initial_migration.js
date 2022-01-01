const Faucet = artifacts.require("Faucet");
const TestToken = artifacts.require("TestToken");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer, network, accounts) {
  let token;
  switch (network) {
    case "harmony": {
      token = process.env.HT_TOKEN;
      break;
    }
    case "aurora": {
      token = process.env.AT_TOKEN;
      break;
    }
    case "rinkeby": {
      token = process.env.RINKEBY_TOKEN;
      break;
    }
    default: {
      await deployer.deploy(TestToken);
      token = await TestToken.deployed();
      token = token.address;
      break;
    }
  }
  await deployer.deploy(Faucet, token, web3.utils.toWei("100"), 60);
};