import React, {Component} from 'react';
import './App.css';
import Select from 'react-select';
import axios from 'axios';

const options = [
  { value: 'BOS', label: 'Boston' },
  { value: 'MAD', label: 'Madrid' },
  { value: 'AKL', label: 'Auckland'},
  { value: 'BKK', label: 'Suvarnabhumi'},
  { value: 'BNE', label: 'Brisbane'},
  { value: 'CNX', label: 'Chiang Mai'},
  { value: 'DEL', label: 'Delhi'},
  { value: 'HKG', label: 'Hong Kong'},
  { value: 'KUL', label: 'Kullu Manali'},
  { value: 'MEL', label: 'Melbourne'},
  { value: 'MNL', label: 'Ninoy Aquino'},
  { value: 'SIN', label: 'Singapore Changi'},
  { value: 'SYD', label: 'Sydney'},
  { value: 'TYO', label: 'Tokyo'},
  { value: 'BOG', label: 'Bogota'},
  { value: 'BUE', label: 'Buenus Aires'},

];
class App extends Component {

  constructor(props) {
		super(props)
		this.state = {
      selectedOption: null,
      flights: [],
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
	}

  handleChange = async selectedOption => {
    this.setState(prevState => ({
      selectedOption: selectedOption
    }));
    const airport = {origin: selectedOption.value};
    await axios.post('/amadeus-inspirational-flights', airport)
          .then(response => {
            console.log(response.data);
            this.setState(prevState => ({
              selectedOption: {...prevState.selectedOption},
              flights: response.data,
              error: false
            })
            );
          })
          .catch(error => {
            this.setState(() => ({
              error: true
            }))
            console.log(error.response.data)
          }); 
    console.log(this.state.flights);
    console.log(`Option selected:`, selectedOption.value);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div className="App">
      <div className="title"> Flight Inspirational Search</div> 
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        className = "search-bar"
      />
      <br></br>
      {
        <div className="row-center">
        {
          this.state.error === true ? (<p className="error-card"> Something went wrong</p >) :
            this.state.flights.length ? (this.state.flights.map(flight => {
              return(
                <div>
                <div className="flight-card-row" style={{width:'400px', height:'200px'}}>
                  <div className="card-left" style={{float:'left'}}> 
                    <h1 style={{float:'left'}}>{flight.origin}</h1>
                    <h1 style={{float:'right'}}>{flight.destination}</h1>
                    <p style={{clear:'both'}}>Departure date: {flight.departureDate}</p>
                    <p style={{clear:'both'}}>Return date: {flight.returnDate}</p>
                  </div>
                  <div className="card-right" style={{float:'right'}}>
                    <h1> PRICE:</h1>
                    <h1> {flight.price.total} $</h1>
                  </div>
                </div>
                <hr></hr>
                </div>
              )
            })):(<p className="info-card"> No flights</p>)
        }
        </div>
      }

      </div>
    );
  }
}

export default App;

