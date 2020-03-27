import React, { Component } from 'react'
import './App.css'
import Conversor from './components/Conversor'
import Conversor2 from './components/Conversor2'

class App extends Component {
  constructor () {
    super()

    this.state = {
      dolar: '',
      euro: ''
    }
  }

  componentDidMount () {
    //localStorage.removeItem('cot')
    let ls = localStorage.getItem('cot')
    let lsMill = parseFloat(localStorage.getItem('cotMill'))
    lsMill += 3600000
    let atualdate = new Date()
    console.log(atualdate.getTime(), lsMill)
    if (!ls || atualdate.getTime() > lsMill) {
      console.log('buscou')
      localStorage.removeItem('cot')
      localStorage.removeItem('cotMill')

      let from_to = 'USD_BRL,EUR_BRL'
      let url = `https://free.currconv.com/api/v7/convert?apiKey=02a0baf4414a654a31db&q=${from_to}&compact=y`

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          localStorage.setItem('cot', JSON.stringify(json))
          let date = new Date()
          localStorage.setItem('cotMill', date.getTime())

          let cot1 = parseFloat(json.USD_BRL.val).toFixed(2)
          let cot2 = parseFloat(json.EUR_BRL.val).toFixed(2)
          this.setState({ dolar: cot1 })
          this.setState({ euro: cot2 })
        })
    } else {
      //console.log(ls)
      let json = JSON.parse(ls)

      let cot1 = parseFloat(json.USD_BRL.val).toFixed(2)
      let cot2 = parseFloat(json.EUR_BRL.val).toFixed(2)
      this.setState({ dolar: cot1 })
      this.setState({ euro: cot2 })
    }

    let from_to = 'USD_BRL,EUR_BRL'
    let url = '' //`https://free.currconv.com/api/v7/convert?apiKey=02a0baf4414a654a31db&q=${from_to}&compact=y`

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        let cot1 = parseFloat(json.USD_BRL.val).toFixed(2)
        let cot2 = parseFloat(json.EUR_BRL.val).toFixed(2)
        this.setState({ dolar: cot1 })
        this.setState({ euro: cot2 })
      })
  }

  render () {
    return (
      <div className='app'>
        <div className='header'>
          <h1 className='title'>Currency Converter</h1>
          <div className='divCurr'>
            <div className='curr1'></div>
            <p className='textCurr'>{this.state.dolar}</p>
          </div>
          <div className='divCurr'>
            <div className='curr2'></div>
            <p className='textCurr'>{this.state.euro}</p>
          </div>
        </div>
        <h3 className='title3'>Example</h3>
        <div className='item'>
          <Conversor moedaA='USD' moedaB='BRL'></Conversor>
          <Conversor moedaA='BRL' moedaB='USD'></Conversor>
        </div>
        <h3 className='title3'>Try yourself</h3>
        <div className='item'>
          <Conversor2></Conversor2>
        </div>
        <div className='footer'>
          <p>Developed by: Jones Veriato Hoffstetter</p>
          <p>Hints: Augusto Zvoboter</p>
        </div>
      </div>
    )
  }
}
export default App
