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
            const address_luggage = await luggage.address

            //Checing if the address_luggage is undefined
            assert.notEqual(address_luggage, '');
            assert.notEqual(address_luggage, 0x0);
            assert.notEqual(address_luggage, null);
            assert.notEqual(address_luggage, undefined);
        })

        it("contract has a name", async() => {
            const name = await luggage.name();
            assert.equal(name, "Luggage-Contract");
        })
    })
    describe('request', async() => {
        let new_request, count
        before(async() => {
            new_request = await luggage.createRequest("Abdul Habbibbullah", web3.utils.toWei('10', 'Ether'), [1, 0, 1, 1])
            count = await luggage.requestCount()
        })

        it("Request created", async() => {
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

        it('accepts requests', async () => {
            // Track the seller balance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
        
            // SUCCESS: Buyer makes purchase
            result = await luggage.acceptRequest(count, seller, { from: buyer, value: web3.utils.toWei('10', 'Ether')})
        
            // Check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), count.toNumber(), 'id is correct')
            assert.equal(event.name, 'Abdul Habbibbullah', 'name is correct')
            assert.equal(event.weight, web3.utils.toWei('10', 'Ether'), 'price is correct')
            assert.equal(event.expired, true, 'purchased is correct')
        
            // Check that seller received funds
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)
        
            let price
            price = web3.utils.toWei('10', 'Ether')
            price = new web3.utils.BN(price)
        
            const exepectedBalance = oldSellerBalance.add(price)
        
            assert.equal(newSellerBalance.toString(), exepectedBalance.toString())
        
            // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
            await luggage.acceptRequest(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
            // FAILURE: Buyer tries to buy without enough ether
            await luggage.acceptRequest(count,seller, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
            // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
            await luggage.acceptRequest(count,seller, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
            // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
            await luggage.acceptRequest(count,seller, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
        })
    })
})