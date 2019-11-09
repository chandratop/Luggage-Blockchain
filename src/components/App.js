import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Luggage from '../abis/Luggage.json'
// import Migration from '../abis/Migrations.json'
import Navbar from './Navbar'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // async loadBlockchainData() {
  //   const web3 = window.web3
  //   // Load account
  //   const accounts = await web3.eth.getAccounts()
  //   this.setState({ account: accounts[0] })
  //   const networkIdLuggage = await web3.eth.net.getId()
  //   const networkDataLuggage = Luggage.networks[networkIdLuggage]
  //   // const networkIdMigration = await web3.eth.net.getId()
  //   // const networkDataMigration = Luggage.networks[networkIdMigration]
  //   if(networkDataLuggage) {
  //     const luggage = web3.eth.Contract(Luggage.abi, networkDataLuggage.address)
  //     console.log(luggage)
  //   } else {
  //     window.alert('Marketplace contract not deployed to detected network.')
  //   }
  //   // if(networkDataMigration) {
  //   //   const migration = web3.eth.Contract(Migration.abi, networkDataMigration.address)
  //   //   console.log(migration)
  //   // } else {
  //   //   window.alert('Marketplace contract not deployed to detected network.')
  //   // }
  // }
  async loadBlockchainData(){
    const web3 = window.web3
    // const web3Provider = new web3 (new web3.providers.HttpProvider("http://localhost:7545"));
    // const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
// };
// getAccount();
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