import { fetchedUrl } from "./config.mjs";
import { newRequest, updateRequest, createRequest } from "./middleware.mjs";
import { parseData, error, restart } from "./utils.mjs";
import { initLog } from "./logger.mjs";
import fetch from "node-fetch";

// Perform the Request and update that on on-chain Oracle
export const processor = () => {

    newRequest((error, result) => {

        let url = result.returnValues.urlToQuery + result.returnValues.attributeToFetch;

        fetch(url)
            .then (response => response.json())
            .then( parseData(result))
            .then( updateRequest)
            .catch(error);
    });
};

// Perpetually create a enqueued Oracle Requests
const client = () => {

    // Fetching API Url and Params
    let urlToQuery = fetchedUrl.urlToQuery
    let attributeToFetch = fetchedUrl.attributeToFetch;

    // First Processor Execution
    processor();

    createRequest({
        urlToQuery,
        attributeToFetch
    })
        .then(restart)
        .catch(error)

};

// Init Execution Stack
initLog();
client();