import React, { Component } from 'react'
import Select from 'react-select'
import './Conversor2.css'
import './Conversor.css'
import allCurrency from './json'
import intl from 'react-intl-universal'

const locales = {
  'pt-BR': require('../locales/pt-BR.json'),
  'en-US': require('../locales/en-US.json')
}

export default class Conversor2 extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
      currency1: 0,
      currency2: 0,
      result: 0,
      currencies: [],
      iniValue: '{value: "ALL", label: "ALL"}'
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
      return { value: c, label: c }
    })
    this.setState({ currencies })
  }

  convert = () => {
    if (!this.state.currency1 || !this.state.currency2 || !this.state.value) {
      alert(intl.get('msg.fillallinputs'))
    } else {

      let base = this.state.currency1
      let parm = this.state.currency2
      let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${parm}`

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {

          console.log(json)

          let cot1 = parseFloat(json.rates[parm])
          console.log(cot1)
          let val = parseFloat(this.state.value)
          console.log(val)
          let result = (val * cot1).toFixed(2)
          console.log(val)
          this.setState({ result })
        })
    }
  }

  render () {
    //console.log(options)

    return (
      <div className='conversor2'>
        <div className='inputs2'>
          <input
            className='input'
            type='text'
            onChange={ev => {
              ev.persist()
              const evnt = ev
              var val = evnt.target.value.replace(',', '.')
              this.setState({ value: val })
            }}
          ></input>
          <div className='currencies'>
            <Select
              //value={this.state.iniValue}
              placeholder={intl.get('currency.one')}
              className='select'
              onChange={ev => {
                //console.log(ev)
                this.setState({ currency1: ev.value })
              }}
              options={this.state.currencies}
            ></Select>
            <h3 className='title2'>-></h3>
            <Select
              //value={this.state.iniValue}
              placeholder={intl.get('currency.two')}
              className='select'
              onChange={ev => {
                this.setState({ currency2: ev.value })
              }}
              options={this.state.currencies}
            ></Select>
          </div>
          <input
            className='btn'
            onClick={this.convert}
            type='button'
            value={intl.get('btn.convert')}
          ></input>
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
