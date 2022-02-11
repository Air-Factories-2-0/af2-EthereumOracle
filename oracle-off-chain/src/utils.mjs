import {timeout} from "./config.mjs";
import {processor} from "./oracle.mjs"

//Value retrived is converted to string
export const parseData = result => (response) => {
    return new Promise((resolve, reject) => {
        let id, valueRetrieved;
        try {
            id = result.returnValues.id;
            valueRetrieved = ( JSON.stringify(response) || 0 ).toString();
        } catch (error) {
            reject(error);
            return;
        }
        resolve({id, valueRetrieved});
    });
};


export const wait = (milliseconds) => {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds));
};

//Restart the off-chain-oracle
export const restart = () => {
    wait(timeout).then(processor);
};

export const error = (error) => {
    console.error(error);
    restart();
};