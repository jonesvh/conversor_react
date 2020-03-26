import React, { Component } from 'react'
import Select from 'react-select'
import './Conversor2.css'
import allCurrency from './json'

export default class Conversor2 extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
      currency1: 0,
      currency2: 0,
      result: 0,
      currencies: []
    }
  }

  componentDidMount () {
    //let url = 'https://free.currconv.com/api/v7/currencies?apiKey=02a0baf4414a654a31db'
    /*fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.setState({ currencies: json })
      })*/

    let curr = Object.keys(allCurrency.results)
    let currencies = curr.map(c => {
      return { value: c, label: c }
    })
    this.setState({ currencies })
  }

  convert = () => {
    if (!this.state.currency1 || !this.state.currency2 || !this.state.value) {
      alert(`You've to fill the VALUE and the CURRENCIES`)
    } else {
      let from_to = `${this.state.currency1}_${this.state.currency2}`
      let url = `https://free.currconv.com/api/v7/convert?apiKey=02a0baf4414a654a31db&q=${from_to}&compact=y`
      console.log(url)

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          let cot = parseFloat(json[from_to].val)
          console.log(this.state.value)
          let val = parseFloat(this.state.value)
          let result = val * cot
          result = result.toFixed(2)
          this.setState({ result })
        })
    }
  }

  render () {
    //console.log(options)

    return (
      <div className='conversor2'>
        <div className='linha'>
          <input
            className='value'
            type='text'
            onChange={ev => {
              ev.persist()
              const evnt = ev
              var val = evnt.target.value.replace(',', '.')
              this.setState({ value: val })
            }}
          ></input>
          <div className='currency'>
            <Select
              placeholder='Currency 1'
              className='select'
              onChange={ev => {
                this.setState({ currency1: ev.value })
              }}
              options={this.state.currencies}
            ></Select>
          </div>
          <h3>to</h3>
          <div className='currency'>
            <Select
              placeholder='Currency 2'
              className='select'
              onChange={ev => {
                this.setState({ currency2: ev.value })
              }}
              options={this.state.currencies}
            ></Select>
          </div>
        </div>
        <div className='linha'>
          <input
            className='btn'
            onClick={this.convert}
            type='button'
            value='Convert'
          ></input>
        </div>
        <input
          className='result'
          type='text'
          value={this.state.result}
          disabled={true}
        ></input>
      </div>
    )
  }
}
