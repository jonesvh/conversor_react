import React, { Component } from 'react'
import './App.css'
import Conversor2 from './components/Conversor2'
import intl from 'react-intl-universal'
import logo from './assets/eurocentralbanklogo.png'
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
        <div className='top'>
          <div className='header'>
            <div className='contentHeader'>
              <div className='logo'></div>
              <div className='topCurr'>
                <div className='divCurr'>
                  <div className='curr1'></div>
                  <p className='textCurr'>{this.state.dolar}</p>
                </div>
                <div className='divCurr'>
                  <div className='curr2'></div>
                  <p className='textCurr'>{this.state.euro}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='title'>
            <h1 className='textTitle'>{intl.get('title.dsc')}</h1>
          </div>
          <div className='item'>
            <Conversor2></Conversor2>
          </div>
          <div className='content'>
            <p className='itemContent'>
              Faça suas conversões usando sempre as cotações mais atuais
              publicadas diretamento pelo Banco Central Europeu!
            </p>
          </div>
        </div>
        <div className='container'>
          <p className='itemContainer'>
            Coloque um valor, selecione as moedas para qual deseja converter e tenha imediatamente o resultado
            com base nas cotações publicadas pelo Banco Central Europeu.
          </p>
          <div className="logoBank">
          <img src={logo} className="logoBankImg"></img>
          </div>
          <p className='itemContainer'>
            Para além de saber, exatamente, o valor
            após a conversão em moeda estrangeira, o conversor é relevante para,
            por exemplo, encontrar a maneira mais barata e segura de enviar ou
            de receber dinheiro do exterior, o que, dessa forma, torna o
            planejamento das finanças mais exato. Sabe-se que o mercado é
            instável, e o valor das moedas muda constantemente, portanto é mais
            seguro converter através de valores atualizados diariamente.
          </p>
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
