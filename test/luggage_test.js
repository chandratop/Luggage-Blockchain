const Luggage = artifacts.require('./Luggage.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Luggage', ([deployer, seller, buyer]) => {
    let luggage;

    //Waiting for contract to be deployed
    before(async() => {
        luggage = await Luggage.deployed()
    })

    describe('deployment', async() => {

        //Checking if the contract deploys sucessfully
        it("contract deploys successfully", async() => {
            //Reading the address of the deployed contract
            const address = await luggage.address

            //Checing if the address is undefined
            assert.notEqual(address, '');
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })

        it("contract has a name", async() => {
            const name = await luggage.name();
            assert.equal(name, "Luggage-Contract");
        })
    })
    describe('product', async() => {
        let new_request, count
        before(async() => {
            new_request = await luggage.createRequest("Abdul Habbibbullah", web3.utils.toWei('10', 'Ether'), [1, 0, 1, 1])
            count = await luggage.requestCount()
        })

        it("Product created", async() => {
            assert.equal(count, 1);
            const request_id = new_request.logs[0].args
            assert.equal(request_id.name, "Abdul Habbibbullah", "Name matches")
            assert.equal(request_id.weight, web3.utils.toWei('10', 'Ether'), "Price matches")
            assert.equal(request_id.expired, false, "Expiry state is same")

            // FAILURE: Product must have a name
            await await luggage.createRequest('', web3.utils.toWei('1', 'Ether'), [1, 0, 1, 1], { from: seller }).should.be.rejected;
            // FAILURE: Product must have a price
            await await luggage.createRequest('Vignesh', 0, [1, 0, 1, 1], { from: seller }).should.be.rejected;
        })
    })
})