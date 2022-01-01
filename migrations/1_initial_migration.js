const Faucet = artifacts.require("Faucet");
const TestToken = artifacts.require("TestToken");

require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer, network, accounts) {
  let token;
  switch (network) {
    case "harmony": token = process.env.HT_TOKEN;
    case "aurora": token = process.env.AT_TOKEN;
    case "rinkeby": token = process.env.RINKEBY_TOKEN;
    default: {
      await deployer.deploy(TestToken);
      token = await TestToken.deployed();
      token = token.address;
    }
  }
  await deployer.deploy(Faucet, token);
};
