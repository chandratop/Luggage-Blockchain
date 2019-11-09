pragma solidity ^0.5.0;

contract Luggage {
    string public name;

    // struct passenger {
    //     string name;
    //     string flightNo;
    //     string emailId;
    //     string phoneNo;
    // }

    struct request {
        uint id;
        address passenger;
        uint weight;
        uint bags;
        uint amount;
        bool expired;
    }

    event requestCreated (
        uint id,
        address passenger,
        uint weight,
        uint bags,
        uint amount,
        bool expired
    );
    mapping(uint => request) public requests;

    uint public requestCount = 0;

    constructor() public {
        name = "Luggage-Contract";
    }

    function createRequest(string memory _name,uint _weight, uint _bags, uint _amount) public {
        require(bytes(_name).length > 0,"Invalid Name");
        require(_weight > 0,"Invalid Weight");
        requestCount ++;
        requests[requestCount] = request(requestCount, msg.sender, _weight,_bags,_amount,false);
        emit requestCreated(requestCount, msg.sender, _weight,_bags,_amount,false);
    }

}