import React, { Component } from 'react'
import './App.css'
import Conversor2 from './components/Conversor2'
import intl from 'react-intl-universal'

const locales = {
  'pt-BR': require('./locales/pt-BR.json'),
  'en-US': require('./locales/en-US.json')
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      dolar: '',
      euro: ''
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
    //localStorage.removeItem('cot')
    let ls = localStorage.getItem('cot')
    let lsMill = parseFloat(localStorage.getItem('cotMill'))
    lsMill += 3600000
    let atualdate = new Date()
    //console.log(lsMill - atualdate.getTime())
    if (!ls || atualdate.getTime() > lsMill) {
      //console.log('buscou')
      localStorage.removeItem('cot')
      localStorage.removeItem('cotMill')

      let base = 'BRL'
      let parm = 'USD,EUR'
      let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${parm}`

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          localStorage.setItem('cot', JSON.stringify(json))
          let date = new Date()
          localStorage.setItem('cotMill', date.getTime())

          let cot1 = parseFloat(json.rates.USD)
          cot1 = (1 / cot1).toFixed(3)
          let cot2 = parseFloat(json.rates.EUR)
          cot2 = (1 / cot2).toFixed(3)

          this.setState({ dolar: cot1 })
          this.setState({ euro: cot2 })

          //console.log('buscou APP')
        })
    } else {
      console.log('storage')
      let json = JSON.parse(ls)

      let cot1 = parseFloat(json.rates.USD)
      cot1 = (1 / cot1).toFixed(3)
      let cot2 = parseFloat(json.rates.EUR)
      cot2 = (1 / cot2).toFixed(3)

      this.setState({ dolar: cot1 })
      this.setState({ euro: cot2 })
    }
  }

  render () {
    return (
      <div className='app'>
        <div className='header'>
          <div className='title'>
            <div className='logo'></div>
            <h3 className='textTitle'>{intl.get('title.dsc')}</h3>
          </div>
          <div className='divCurr'>
            <div className='curr1'></div>
            <p className='textCurr'>{this.state.dolar}</p>
          </div>
          <div className='divCurr'>
            <div className='curr2'></div>
            <p className='textCurr'>{this.state.euro}</p>
          </div>
        </div>
        <div className='body'>
          <h3 className='title3'>{intl.get('tryyourself.dsc')}</h3>
          <div className='item'>
            <Conversor2></Conversor2>
          </div>
        </div>
        <div className='footer'>
          <p className='itemFooter'>
            {intl.get('devby.dev')}: Jones Veriato Hoffstetter
          </p>
          <p className='itemFooter'>
            {intl.get('devby.hints')}: Augusto Zvoboter
          </p>
        </div>
      </div>
    )
  }
}
export default App
