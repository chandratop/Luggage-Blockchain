import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
// import Luggage from '../abis/Luggage.json'
// import Migration from '../abis/Migrations.json'
import Navbar from './Navbar'

class App extends Component {

  async componentWillMount() {
    //await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Luggage Distribution</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;