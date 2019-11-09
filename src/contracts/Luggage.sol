pragma solidity ^0.5.0;

contract Luggage {
    string public name;

    
    enum Categories {food,clothing,electronics,other};
    struct request {
        uint id;
        address passenger;
        string name;
        uint weight; // Assumes every bag is separate
        bytes4 categories;
        bool expired;
    }

    event requestCreated (
        uint id,
        address passenger,
        string name,
        uint weight,
        bytes4 categories,
        bool expired
    );

    event requestAccepted (
        uint id,
        address passenger,
        string name,
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
        requests[requestCount] = request(requestCount, msg.sender, _name,_weight,_categories,false);
        emit requestCreated(requestCount, msg.sender, _name,_weight,_categories,false);
    }

    function acceptRequest(uint _id) public payable {
        request memory _request = requests[_id];        //Get the request
        address payable _payer = _request.passenger;    //Get the person making the payment
        require(_request.id > 0 && _request.id <= requestCount);
        require(msg.value >= _request.weight); 
        require(!_request.expired);
        require(_payer != msg.sender);
        _request.expired = true;
        requests[_id] = _request;
        address(msg.sender).transfer(msg.value)
        emit requestAccepted()
    }

}