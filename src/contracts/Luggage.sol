pragma solidity ^0.5.0;

contract Luggage {
    string public name;
    enum Categories {food,clothing,electronics,other}
    struct request {
        uint id;
        address payable acceptor;
        string name;
        uint weight; // Assumes every bag is separate
        bytes4 categories;
        bool expired;
    }

    event requestCreated (
        uint id,
        address payable acceptor,
        string name,
        uint weight,
        bytes4 categories,
        bool expired
    );

    event requestAccepted (
        uint id,
        address payable acceptor,
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
        requests[requestCount] = request(requestCount, 0, _name,_weight,_categories,false);
        emit requestCreated(requestCount,0, _name,_weight,_categories,false);
    }

    function acceptRequest(uint _id,address payable _acceptor) public payable {
        request memory _request = requests[_id];        //Get the request
        address payable _payer = msg.sender;    //Get the person making the payment
        _request.acceptor = _acceptor;
        require(_request.id > 0 && _request.id <= requestCount, "Invalid ID");
        require(msg.value >= _request.weight, "Invalid Value");
        require(!_request.expired, "Request already accepted");
        require(_acceptor != msg.sender, "Requester is same as sender");
        _request.expired = true;
        requests[_id] = _request;
        address(_acceptor).transfer(msg.value);
        emit requestAccepted(requestCount, _payer, _request.name, _request.weight, _request.categories, _request.expired);
    }

}