export const timeout = 1000

export const onChainOracle = {
    address: "0x96B5933BB32251be27a15009A8B10c974678E42e",
    abi: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"urlToQuery","type":"string"},{"indexed":false,"internalType":"string","name":"attributeToFetch","type":"string"}],"name":"NewRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"urlToQuery","type":"string"},{"indexed":false,"internalType":"string","name":"attributeToFetch","type":"string"},{"indexed":false,"internalType":"string","name":"agreedValue","type":"string"}],"name":"UpdatedRequest","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"_getAgreedValue","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"_getPayerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"s","type":"string"}],"name":"_mine","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"headOffset","type":"uint256"},{"internalType":"uint256","name":"tailOffset","type":"uint256"}],"name":"_testOffset","outputs":[{"internalType":"string","name":"t","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_urlToQuery","type":"string"},{"internalType":"string","name":"_attributeToFetch","type":"string"}],"name":"createRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getArrayAddr","outputs":[{"internalType":"address[]","name":"addrs","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getArrayInt","outputs":[{"internalType":"uint256[]","name":"ints","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getArraySize","outputs":[{"internalType":"uint256","name":"size","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_valueRetrieved","type":"string"}],"name":"updateRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
}

export const tokensIDs = [
    'bitcoin',
    'ethereum'
];

//Params to fetch
export const fetchedUrl = {
    urlToQuery: "http://f220-2-44-137-82.ngrok.io",
    attributeToFetch: "/arrayAddress"
};


