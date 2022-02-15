export const timeout = 1000

export const onChainOracle = {
    //contract address and abi
    address: "0xe8b52748ffE7006c5460CC7e8A2dd17fb38b7006",
    abi: [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"urlToQuery","type":"string"},{"indexed":false,"internalType":"string","name":"attributeToFetch","type":"string"}],"name":"NewRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"urlToQuery","type":"string"},{"indexed":false,"internalType":"string","name":"attributeToFetch","type":"string"},{"indexed":false,"internalType":"string","name":"agreedValue","type":"string"}],"name":"UpdatedRequest","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"_urlToQuery","type":"string"},{"internalType":"string","name":"_attributeToFetch","type":"string"}],"name":"createRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_valueRetrieved","type":"string"}],"name":"updateRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
}

export const tokensIDs = [
    'bitcoin',
    'ethereum'
];