import React, {Component} from 'react';
import './App.css';
import Conversor from './components/Conversor'
import Conversor2 from './components/Conversor2'

class App extends Component {
  render(){
    return (
      <div className="app">

        <h2 className="title">Currency Converter of the Jones'</h2>

        <h3>Example</h3>
        <div className="item">
          <Conversor moedaA="USD" moedaB="BRL"></Conversor>
          <Conversor moedaA="BRL" moedaB="USD"></Conversor>
        </div>
        <h3>Try yourself</h3>
        <div className="item">
          <Conversor2></Conversor2>
        </div>
      </div>
    )
  }
}

export default App;