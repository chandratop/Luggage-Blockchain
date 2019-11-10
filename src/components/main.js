import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" >
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
            <th scope="col">Extra Bags</th>
            <th scope="col">Exceeded Weight</th>
            <th scope="col">Flight Number</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Departure Airport</th>
            <th scope="col">Arrival Airport</th>
            <th scope="col">&nbsp;</th>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Waqar Khan</td>
            <td>2</td>
            <td>10kg</td>
            <td>6E 335</td>
            <td>13:45:00</td>
            <td>Bangalore</td>
            <td>Bangkok</td>
            <td><button type="button" className="btn btn-primary" onClick={(e) => window.alert("User has accepted the luggage")}>Accept</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Harish Paul</td>
            <td>3</td>
            <td>8kg</td>
            <td>SG 745</td>
            <td>07:15:00</td>
            <td>Mumbai</td>
            <td>Dubai</td>
            <td><button type="button" className="btn btn-primary" onClick={(e) => window.alert("User has accepted the luggage")}>Accept</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Aashi Milind</td>
            <td>1</td>
            <td>6kg</td>
            <td>9W 340</td>
            <td>15:50:00</td>
            <td>Chennai</td>
            <td>Thailand</td>
            <td><button type="button" className="btn btn-primary" onClick={(e) => window.alert("User has accepted the luggage")}>Accept</button></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Tarun Singh</td>
            <td>2</td>
            <td>11kg</td>
            <td>IX 112</td>
            <td>12:00:00</td>
            <td>Kochi</td>
            <td>New Delhi</td>
            <td><button type="button" className="btn btn-primary" onClick={(e) => window.alert("User has accepted the luggage")}>Accept</button></td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Irffan Haq</td>
            <td>3</td>
            <td>14kg</td>
            <td>G8 902</td>
            <td>06:10:00</td>
            <td>Chandigarh</td>
            <td>Gangtok</td>
            <td><button type="button" className="btn btn-primary" onClick={(e) => window.alert("User has accepted the luggage")}>Accept</button></td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Finneas Hill</td>
            <td>1</td>
            <td>5kg</td>
            <td>1X 445</td>
            <td>04:59:59</td>
            <td>Andaman</td>
            <td>Nicobar</td>
            <td><button type="button" className="btn btn-primary" onClick={(e) => window.alert("User has accepted the luggage")}>Accept</button></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Main;