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
      currency1: '',
      currency2: '',
      result: 0,
      currencies: [],
      isVal1: true
    }
    const currentLocale = locales[navigator.language]
      ? navigator.language
      : 'pt-BR'

    intl.init({
      currentLocale,
      locales
    })
  }

  setDefault = async e => {
    if (navigator.language === 'pt-BR') {
      this.setState({ currency1: 'USD' })
      this.setState({ currency2: 'BRL' })
    } else {
      this.setState({ currency1: 'EUR' })
      this.setState({ currency2: 'USD' })
    }
  }

  setDefaultAss = async e => {
    await this.setDefault(e)
    this.convert()
  }

  componentDidMount () {
    let curr = Object.keys(allCurrency.results)
    let currencies = curr.map(c => {
      return { label: c, value: c }
    })
    this.setState({ currencies })
    this.setDefaultAss()
  }

  convert = () => {
    if (!this.state.value || this.state.value === 0) {
      this.setState({ result: 0 })
    } else {
      //} else {
      let base = this.state.currency1
      let parm = this.state.currency2

      let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${parm}`

      //console.log(base, parm, url)

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          //console.log(json)

          let cot1 = parseFloat(json.rates[parm])
          let isVal1 = this.state.isVal1
          if (isVal1) {
            let val = parseFloat(this.state.value)
            let result = (val * cot1).toFixed(3)
            this.setState({ result })
          } else {
            let val = parseFloat(this.state.result)
            let value = (val / cot1).toFixed(3)
            this.setState({ value })
          }
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
    this.setState({ isVal1: true })
  }

  setValueAss = async e => {
    await this.setValue(e)
    this.convert()
  }

  setValue2 = async e => {
    this.setState({ result: e })
    this.setState({ isVal1: false })
  }

  setValue2Ass = async e => {
    await this.setValue2(e)
    this.convert()
  }

  render () {
    //console.log(options)

    return (
      <div className='conversor2'>
        <div className='inputs2'>
          <input
            className='input'
            type='number'
            inputMode='numeric'
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
              isSearchable={false}
              defaultValue={{
                label: this.state.currency1,
                value: this.state.currency1
              }}
              value={{
                label: this.state.currency1,
                value: this.state.currency1
              }}
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
                alt='swap'
              ></img>
            </div>
            <Select
              isSearchable={false}
              value={{
                label: this.state.currency2,
                value: this.state.currency2
              }}
              defaultValue={{
                label: this.state.currency2,
                value: this.state.currency2
              }}
              className='select'
              onChange={ev => {
                this.setCurr2Ass(ev)
              }}
              options={this.state.currencies}
            ></Select>
          </div>
          <input
            className='input'
            type='number'
            inputMode='numeric'
            value={this.state.result}
            onChange={ev => {
              ev.persist()
              const evnt = ev
              var val = evnt.target.value.replace(',', '.')
              this.setValue2Ass(val)
            }}
          ></input>
        </div>
      </div>
    )
  }
}
