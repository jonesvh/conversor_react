import React, { Component } from 'react'
import Select from 'react-select'
import './Conversor2.css'
import './Conversor.css'
import allCurrency from './currencies'
import intl from 'react-intl-universal'
import logoSwap from '../assets/logoswap.png'

const locales = {
  'pt-BR': require('../locales/pt-BR.json'),
  'en-US': require('../locales/en-US.json')
}

export default class Conversor2 extends Component {
  constructor () {
    super()
    this.state = {
      value: 1,
      currency1: 'USD',
      currency2: 'BRL',
      result: 0,
      currencies: []
    }
    const currentLocale = locales[navigator.language]
      ? navigator.language
      : 'pt-BR'

    intl.init({
      currentLocale,
      locales
    })
  }

  componentDidMount () {
    let curr = Object.keys(allCurrency.results)
    let currencies = curr.map(c => {
      return { label: c, value: c }
    })
    this.setState({ currencies })
    this.convert()
  }

  convert = () => {
    if (!this.state.value || this.state.value === 0) {
      this.setState({result:0})
    } else {
      //} else {
      let base = this.state.currency1
      let parm = this.state.currency2
      let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${parm}`

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          //console.log(json)

          let cot1 = parseFloat(json.rates[parm])
          //console.log(cot1)
          let val = parseFloat(this.state.value)
          //console.log(val)
          let result = (val * cot1).toFixed(2)
          //console.log(val)
          this.setState({ result })
        })
    }
  }

  swapCurr = async e => {
    let c1 = this.state.currency1
    let c2 = this.state.currency2
    this.setState({ currency1: c2 })
    this.setState({ currency2: c1 })
  }

  swapCurrAss = async e => {
    await this.swapCurr(e)
    this.convert()
  }

  setCurr1 = async e => {
    this.setState({ currency1: e.value })
  }

  setCurr1Ass = async e => {
    await this.setCurr1(e)
    this.convert()
  }

  setCurr2 = async e => {
    this.setState({ currency2: e.value })
  }

  setCurr2Ass = async e => {
    await this.setCurr2(e)
    this.convert()
  }

  setValue = async e => {
    this.setState({ value: e })
  }

  setValueAss = async e => {
    await this.setValue(e)
    this.convert()
  }

  render () {
    //console.log(options)

    return (
      <div className='conversor2'>
        <div className='inputs2'>
          <input
            className='input'
            type='text'
            value={this.state.value}
            onChange={ev => {
              ev.persist()
              const evnt = ev
              var val = evnt.target.value.replace(',', '.')
              this.setValueAss(val)
            }}
          ></input>
          <div className='currencies'>
            <Select
              defaultValue={{ label: 'USD', value: 'USD' }}
              value={{
                label: this.state.currency1,
                value: this.state.currency1
              }}
              placeholder={intl.get('currency.one')}
              className='select'
              onChange={ev => {
                this.setCurr1Ass(ev)
              }}
              options={this.state.currencies}
            ></Select>
            <div className='logoSwap'>
              <img
                onClick={() => {
                  this.swapCurrAss()
                }}
                src={logoSwap}
                className='logoSwapImg'
                alt="swap"
              ></img>
            </div>
            <Select
              value={{
                label: this.state.currency2,
                value: this.state.currency2
              }}
              defaultValue={{ label: 'BRL', value: 'BRL' }}
              placeholder={intl.get('currency.two')}
              className='select'
              onChange={ev => {
                this.setCurr2Ass(ev)
              }}
              options={this.state.currencies}
            ></Select>
          </div>
          <input
            className='result'
            type='text'
            value={this.state.result}
            disabled={true}
          ></input>
        </div>
      </div>
    )
  }
}
