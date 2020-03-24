import React, { Component } from 'react'
import './Conversor2.css'
export default class Conversor2 extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
      currencyVal1:0,
      currencyVal2:0,
      result: 0,
    }
  }

  change = () => {
    let conv = (parseFloat(this.state.value) * this.state.currencyVal1 / this.state.currencyVal2).toFixed(2)
    console.log(conv)
  }

  render () {
    return (
      <div className='conversor2'>
        <div className='linha'>
          <input
            className='input'
            type='text'
            value={this.state.value}
            onChange={ev => {
              this.setState({ value: ev.target.value })
            }}
          ></input>
          <div className='currency'>
            <select
              className='select'
              defaultValue={'USD'}
              onChange={ev => {
                this.setState({ currencyVal1: parseFloat(ev.target.value) })
              }}
            >
              <option value='0'>Select a currency</option>
              <option value='5.14'>USD</option>
              <option value='1'>BRL</option>
              <option value='5.55'>EUR</option>
            </select>
          </div>
          <h3>to</h3>
          <div className='currency'>
            <select className='select'
              defaultValue={'EUR'}
              onChange={ev => {
                this.setState({ currencyVal2: parseFloat(ev.target.value) })
              }}>
              <option value='0'>Select a currency</option>
              <option value='5'>USD</option>
              <option value='1'>BRL</option>
              <option value='5.55'>EUR</option>
            </select>
          </div>
        </div>
        <div className='linha'>
          <input
            className='button'
            type='button'
            value='Convert'
            onClick={this.change}
          ></input>
        </div>
        <h3>result</h3>
      </div>
    )
  }
}
