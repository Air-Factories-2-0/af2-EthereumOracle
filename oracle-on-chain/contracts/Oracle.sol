pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
    Request[] requests; //list of requests made to the contract
    uint currentId = 0; //increasing request id

    // defines a general api request
    struct Request {
        uint id;                            //request id
        string urlToQuery;                  //API url
        string attributeToFetch;            //json attribute (key) to retrieve in the response
        string agreedValue;                 //value from key
        address oracle;                     //oracle which will query the answer
    }

    //event that triggers oracle outside of the blockchain
    event NewRequest (
        uint id,
        string urlToQuery,
        string attributeToFetch
    );

    //triggered when there's a consensus on the final result
    event UpdatedRequest (
        uint id,
        string urlToQuery,
        string attributeToFetch,
        string agreedValue
    );

    function createRequest (
        string memory _urlToQuery,
        string memory _attributeToFetch
    )
    public
    {
        requests.push(Request(currentId, _urlToQuery, _attributeToFetch, "", address(0xB6bEC2669F296fCaA7EC42252e5e4Be3f0FE5033) ));

        // launch an event to be detected by oracle outside of blockchain
        emit NewRequest (
            currentId,
            _urlToQuery,
            _attributeToFetch
        );

        // increase request id
        currentId++;
    }

    //called by the oracle to record its answer
    function updateRequest (
        uint _id,
        string memory _valueRetrieved
    ) public {

        Request storage currRequest = requests[_id];

        //check if oracle is the trusted oracle
        if( currRequest.oracle == address(msg.sender) ){
            currRequest.agreedValue = _valueRetrieved;
                emit UpdatedRequest (
                        currRequest.id,
                        currRequest.urlToQuery,
                        currRequest.attributeToFetch,
                        currRequest.agreedValue
                );

        }
    }
}


