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
        address payerAddress;               //address that pay tha calls
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
        requests.push(Request(currentId, _urlToQuery, _attributeToFetch, "", address() )); //Insert personal address between ()

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

        //check if payerAddress is the msg.sender
        if( currRequest.payerAddress == address(msg.sender) ){
            currRequest.agreedValue = _valueRetrieved;
                emit UpdatedRequest (
                        currRequest.id,
                        currRequest.urlToQuery,
                        currRequest.attributeToFetch,
                        currRequest.agreedValue
                );

        }
    }

    //Get the result of the request
    function _getAgreedValue (uint index) public view returns (string memory) {
        return requests[index].agreedValue;
    }

    //Get the address of who called the function and will pay
    function _getPayerAddress(uint index) public view returns (address) {
        return requests[index].payerAddress;
    }

    //Get the lenght of the string
    function _mine(string memory s) public pure returns (uint256) {
        return bytes(s).length;
    }

    //Locates and returns the position of a character within a string starting from a defined offset
    function _indexOf(string memory _base, string memory _value, uint _offset) internal pure returns (int) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        assert(_valueBytes.length == 1);

        for (uint i = _offset; i < _baseBytes.length; i++) {
            if (_baseBytes[i] == _valueBytes[0]) {
                return int(i);
            }
        }

        return -1;
    }

    //Extracts the part of a string based on the desired length and offset
    function _substring(string memory _base, uint _length, uint _offset) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);

        assert(uint(_offset + _length) <= _baseBytes.length);

        string memory _tmp = new string(uint(_length));
        bytes memory _tmpBytes = bytes(_tmp);

        uint j = 0;
        for (uint i = uint(_offset); i < uint(_offset + _length); i++) {
            _tmpBytes[j++] = _baseBytes[i];
        }

        return string(_tmpBytes);
    }

    //Splits a string into an array of strings based off the delimiter value
    function _split(string memory _base, string memory _value) internal pure returns (string[] memory splitArr) {
        bytes memory _baseBytes = bytes(_base);

        uint _offset = 0;
        uint _splitsCount = 1;
        while (_offset < _baseBytes.length - 1) {
            int _limit = _indexOf(_base, _value, _offset);
            if (_limit == -1)
                break;
            else {
                _splitsCount++;
                _offset = uint(_limit) + 1;
            }
        }

        splitArr = new string[](_splitsCount);

        _offset = 0;
        _splitsCount = 0;
        while (_offset < _baseBytes.length) {

            int _limit = _indexOf(_base, _value, _offset);
            if (_limit == - 1) {
                _limit = int(_baseBytes.length);
            }

            string memory _tmp = new string(uint(_limit) - _offset);
            bytes memory _tmpBytes = bytes(_tmp);

            uint j = 0;
            for (uint i = _offset; i < uint(_limit); i++) {
                _tmpBytes[j++] = _baseBytes[i];
            }
            _offset = uint(_limit) + 1;
            splitArr[_splitsCount++] = string(_tmpBytes);
        }
        return splitArr;
    }


    function _getSlice(uint256 begin, uint256 end, string memory text) internal pure returns (string memory) {
        bytes memory a = new bytes(end-begin+1);
        for(uint i=0;i<=end-begin;i++){
            a[i] = bytes(text)[i+begin-1];
        }
        return string(a);
    }

    //Compares the characters of two strings
    function _compareTo(string memory _base, string memory _value) internal pure returns (bool) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        if (_baseBytes.length != _valueBytes.length) {
            return false;
        }

        for (uint i = 0; i < _baseBytes.length; i++) {
            if (_baseBytes[i] != _valueBytes[i]) {
                return false;
            }
        }

        return true;
    }

    //Convert string to uint
    function _stringToUint(string memory _str) internal pure returns(uint256 res) {

        for (uint256 i = 0; i < bytes(_str).length; i++) {
            if ((uint8(bytes(_str)[i]) - 48) < 0 || (uint8(bytes(_str)[i]) - 48) > 9) {
                return (0);
            }
            res += (uint8(bytes(_str)[i]) - 48) * 10**(bytes(_str).length - i - 1);
        }

        return (res);
    }

    //Convert string to address
    function _stringToAddress(string memory _a) internal pure returns (address){

        bytes memory tmp = bytes(_a);
        uint iaddress = 0;
        uint b1;
        uint b2;
        for (uint i=2; i<2+2*20; i+=2){

            iaddress *= 256;
            b1 = uint(uint8(tmp[i]));
            b2 = uint(uint8(tmp[i+1]));

            if ((b1 >= 97)&&(b1 <= 102)) b1 -= 87;
            else if ((b1 >= 48)&&(b1 <= 57)) b1 -= 48;

            if ((b2 >= 97)&&(b2 <= 102)) b2 -= 87;
            else if ((b2 >= 48)&&(b2 <= 57)) b2 -= 48;

            iaddress += (b1*16+b2);
        }
        return address(iaddress);
    }

    //Test the offset of a string
    function _testOffset (uint index, uint headOffset, uint tailOffset) public view returns (string memory t) {
        uint length = _mine(requests[index].agreedValue);
        t = _substring(requests[index].agreedValue, uint(length - tailOffset), headOffset);
        return t;
    }

    //Get the size of the array
    function getArraySize (uint index) public view returns (uint size){
        size = 1;
        uint length = _mine(requests[index].agreedValue);

        for (uint i=0; i < length ; i++){
            if(_compareTo(_getSlice(i+1,i+1,requests[index].agreedValue),',')){
                size++;
            }
        }
        return size;
    }

    function getArrayInt (uint index)  public view returns (uint[] memory ints) {
        return getArrayIntOffset(index, 1, 2);
    }

    //Create an array of Integers
    function getArrayIntOffset (uint index, uint headOffset, uint tailOffset) internal view returns (uint[] memory ints) {

        uint length = _mine(requests[index].agreedValue);
        string memory t = _substring(requests[index].agreedValue, uint(length - tailOffset), headOffset);
        string[] memory array = _split(t,",");
        ints = new uint[](array.length);

        for(uint256 i = 0 ; i<array.length; i++){
            ints[i] = _stringToUint(array[i]);
        }

        return ints;
    }

    function getArrayAddr (uint index)  public view returns (address[] memory addrs) {
        return getArrayAddrOffset(index, 1, 2);
    }

    //Create an array of address
    function getArrayAddrOffset (uint index, uint headOffset, uint tailOffset) internal view returns (address[] memory addrs) {

        uint length = _mine(requests[index].agreedValue);
        string memory t = _substring(requests[index].agreedValue, uint(length - tailOffset), headOffset);
        string[] memory array = _split(t,",");
        addrs = new address[](array.length);

        for(uint256 i = 0 ; i<array.length; i++){
            addrs[i] = _stringToAddress(array[i]);
        }

        return addrs;
    }
}


