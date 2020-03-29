import React, { Component } from 'react'
import Select from 'react-select'
import './Conversor2.css'
import allCurrency from './json'
import intl from 'react-intl-universal';

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
      alert(intl.get('msg.fillallinputs'))
    } else {
      let from_to = `${this.state.currency1}_${this.state.currency2}`
      let url = `https://free.currconv.com/api/v7/convert?apiKey=02a0baf4414a654a31db&q=${from_to}&compact=y`
      //console.log(url)

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          let cot = parseFloat(json[from_to].val)
          //console.log(this.state.value)
          let val = parseFloat(this.state.value)
          let result = val * cot
          result = result.toFixed(2)
          this.setState({ result })

          console.log('buscou Conversor 2')
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
              placeholder={intl.get("currency.one")}
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
              placeholder={intl.get("currency.two")}
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
            value={intl.get("btn.convert")}
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
