var CarReward = artifacts.require("./CarReward.sol");
var Marketplace = artifacts.require('./Marketplace.sol');

module.exports = function(deployer) {
  deployer.deploy(CarReward);
  deployer.deploy(Marketplace);
};
