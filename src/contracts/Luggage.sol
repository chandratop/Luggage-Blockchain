pragma solidity ^0.5.0;

contract Luggage {
    string public name;

    
    enum Categories {food,clothing,electronics,other};
    struct request {
        uint id;
        address passenger;
        uint weight; // Assumes every bag is separate
        bytes4 categories;
        bool expired;
    }

    event requestCreated (
        uint id,
        address passenger,
        uint weight,
        bytes4 categories,
        bool expired
    );
    mapping(uint => request) public requests;

    uint public requestCount = 0;

    constructor() public {
        name = "Luggage-Contract";
    }

    function createRequest(string memory _name,uint _weight,bytes4 _categories) public {
        require(bytes(_name).length > 0,"Invalid Name");
        require(_weight > 0,"Invalid Weight");
        requestCount ++;
        requests[requestCount] = request(requestCount, msg.sender, _weight,_categories,false);
        emit requestCreated(requestCount, msg.sender, _weight,_categories,false);
    }

}