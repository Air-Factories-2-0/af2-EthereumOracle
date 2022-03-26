const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();


module.exports = {
    networks: {
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
            accounts: { mnemonic: process.env.MNEMONIC }
        },
        rinkeby: {
            provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/"+process.env.INFURA_KEY),
            network_id: 4,
            gas: 6500000,
            //gasPrice: 4700000000,
            confirmations: 2,
            timeoutBlocks: 200,
            networkCheckTimeout: 1000000,
            skipDryRun: true,
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },
    api_keys: {
        etherscan: process.env.ETHERSCAN_KEY
    },
    plugins: ['truffle-plugin-verify'],
};