import { updatedRequest, newRequest } from "./middleware.mjs";



export const initLog = () => {

    //logs id block and url
    newRequest((error, result) => {
        console.log(">>> New Request Data Event On Smart Contract");
        console.log("Block Number: " + result.blockNumber)
        console.log("NewRequest Data: ");
        console.log("   ID: " + result.returnValues[0]);
        console.log("   URL_TO_QUERY: " + result.returnValues[1] + result.returnValues[2]);
        console.log("\n");
    });
    //logs id block url and value
    updatedRequest((error, result) => {
        console.log(">>> Update Request Data Event On Smart Contract");
        console.log("Block Number: " + result.blockNumber)
        console.log("UpdateRequest Data: ");
        console.log("   ID: " + result.returnValues[0]);
        console.log("   URL_TO_QUERY: " + result.returnValues[1] + result.returnValues[2]);
        console.log("   VALUE_RETRIEVED: " + result.returnValues[3]);
        console.log("\n");
    });
};