import React, { Component } from 'react'
import './App.css'
import Conversor from './components/Conversor'
import Conversor2 from './components/Conversor2'
import intl from 'react-intl-universal'
import ReactGA from 'react-ga'

function initGA () {
  ReactGA.initialize('G-NW0S6Z0CWF')
  //ReactGA.pageview(window.location.pathname + window.location.search)
  ReactGA.pageview('/index.html')
}

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
    initGA()
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

          //console.log('buscou APP')
        })
    } else {
      //console.log(ls)
      let json = JSON.parse(ls)

      let cot1 = parseFloat(json.USD_BRL.val).toFixed(2)
      let cot2 = parseFloat(json.EUR_BRL.val).toFixed(2)
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
          <h3 className='title3'>{intl.get('example.dsc')}</h3>
          <div className='item'>
            <Conversor moedaA='USD' moedaB='BRL'></Conversor>
            <Conversor moedaA='EUR' moedaB='BRL'></Conversor>
          </div>
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
