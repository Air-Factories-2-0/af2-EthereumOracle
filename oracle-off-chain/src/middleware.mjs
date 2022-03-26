import dotenv from "dotenv";
import Web3 from "web3";
import { onChainOracle } from "./config.mjs";

dotenv.config();
const web3 = new Web3( new Web3.providers.WebsocketProvider(process.env.WEB3_PROVIDER_ADDRESS+process.env.INFURA_KEY));
const account = web3.eth.accounts.privateKeyToAccount( process.env.ACCOUNT_PK );
web3.eth.accounts.wallet.add(account);
const contract = await new web3.eth.Contract( onChainOracle.abi, onChainOracle.address);

export const createRequest = async ({ urlToQuery, attributeToFetch }) => {

    let estimateGas = await contract.methods.createRequest(urlToQuery, attributeToFetch).estimateGas({from: account.address});
    let gasPrice = await web3.eth.getGasPrice();

    return await contract.methods.createRequest(urlToQuery, attributeToFetch).send({
            from: account.address,
            gas: estimateGas,
            gasPrice: gasPrice
        }).on('error', function( error ) {
            console.log( error )
    });
}

export const updateRequest = async ({ id, valueRetrieved }) => {

    let estimateGas = await contract.methods.updateRequest(id, valueRetrieved).estimateGas({from: account.address});
    let gasPrice = await web3.eth.getGasPrice();

    return await contract.methods.updateRequest(id, valueRetrieved).send({
        from: account.address,
        gas: estimateGas,
        gasPrice: gasPrice
    }).on('error', function( error ) {
        console.log( error )
    });
};

export const newRequest = (callback) => {
    contract.events.NewRequest((error, result) => callback(error, result));
};

export const updatedRequest = (callback) => {
    contract.events.UpdatedRequest((error, result) => callback(error, result));
};