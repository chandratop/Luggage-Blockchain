const Luggage = artifacts.require("Luggage");

module.exports = function(deployer) {
    deployer.deploy(Luggage);
};