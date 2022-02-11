const Oracle = artifacts.require("../contracts/Oracle.sol");

module.exports = function (deployer) {
    deployer.deploy(Oracle);
};