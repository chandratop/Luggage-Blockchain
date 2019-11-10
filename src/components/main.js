import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h2>Create Requests</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.requestName.value
          const weight = this.requestWeight.value
          const categories = this.requestCategories.value
          const flightNo = this.requestFlightNo.value
          this.props.createRequest(name, weight, categories, flightNo) 
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="requestName"
              type="text"
              ref={(input) => { this.requestName = input }}
              className="form-control"
              placeholder="Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestWeight"
              type="text"
              ref={(input) => { this.requestWeight = input }}
              className="form-control"
              placeholder="Weight"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestFlightNo"
              type="text"
              ref={(input) => { this.requestFlightNo = input }}
              className="form-control"
              placeholder="Flight No."
              required />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
        <p>&nbsp;</p>
        <h2>Accept Requests</h2>
        <table className="table">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Exceeded Weight</th>
            <th scope="col">Flight Number</th>
            <th scope="col">&nbsp;</th>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Karan Mehta</td>
            <td>10kg</td>
            <td>6E 335</td>
            <td><button type="button" className="btn btn-primary">Accept</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Sneha Paul</td>
            <td>8kg</td>
            <td>SG 745</td>
            <td><button type="button" className="btn btn-primary">Accept</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Rohan Milind</td>
            <td>6kg</td>
            <td>9W 340</td>
            <td><button type="button" className="btn btn-primary">Accept</button></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Tarun Singh</td>
            <td>11kg</td>
            <td>IX 112</td>
            <td><button type="button" className="btn btn-primary">Accept</button></td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>George D'Souza</td>
            <td>5kg</td>
            <td>G8 902</td>
            <td><button type="button" className="btn btn-primary">Accept</button></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Main;