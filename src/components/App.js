import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Luggage from '../abis/Luggage.json'
// import Migration from '../abis/Migrations.json'
import Navbar from './Navbar'
import Main from './Main.js'

class App extends Component {

  async componentWillMount() {
    // await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
    const accounts = await web3.eth.getAccounts()
    // console.log(accounts)
    // const web3 = window.web3
    // const accounts = await web3.eth.getAccounts()
    //* console.log(accounts) IT WORKS!! 2:57am
    this.setState({ account: accounts[0] })
    // TODO: We have assigned the this pointer to the first account, which has to be saved as a variable later and flagged
    const networkId = await web3.eth.net.getId()
    const networkData = Luggage.networks[networkId]
    if (networkData) {
      const luggage = web3.eth.Contract(Luggage.abi, networkData.address)
      console.log(luggage)
      this.setState({ luggage })
      this.setState({ loading: false })
    } else {
      window.alert("Luggage place not detected")
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      requests: [],
      loading: true
    }
    this.createRequest = this.createRequest.bind(this)
  }

  createRequest(name, weight, categories, flightNo) {
    this.setState({ loading: true })
    this.state.luggage.methods.createRequest(name, weight, categories, flightNo).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading
                ? <div id="loader" className="text-centre"><p className="text=centre">Loading...</p></div>
                : <Main createRequest={this.createRequest} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;