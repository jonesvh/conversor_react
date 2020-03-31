import React, { Component, Fragment } from 'react'
import './App.css'
import Conversor2 from './components/Conversor2'
import intl from 'react-intl-universal'
import Media from 'react-media'

import logo from './assets/eurocentralbanklogo.png'
import logoMoney from './assets/moneyuplogo.png'
import logoTravel from './assets/logotravel.png'

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
      //console.log('storage')
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
            <div>
              <Media
                queries={{
                  small: '(max-width: 599px)',
                  medium: '(min-width: 600px) and (max-width: 1199px)',
                  large: '(min-width: 1200px)'
                }}
              >
                {matches => (
                  <Fragment>
                    {matches.small && (
                      <h3 className='textTitle3'>{intl.get('title.dsc')}</h3>
                    )}
                    {matches.medium && (
                      <h2 className='textTitle2'>{intl.get('title.dsc')}</h2>
                    )}
                    {matches.large && (
                      <h1 className='textTitle1'>{intl.get('title.dsc')}</h1>
                    )}
                  </Fragment>
                )}
              </Media>
            </div>
          </div>
          <div className='item'>
            <Conversor2></Conversor2>
          </div>
          <div>
            <Media
              queries={{
                small: '(max-width: 599px)',
                medium: '(min-width: 600px) and (max-width: 1199px)',
                large: '(min-width: 1200px)'
              }}
            >
              {matches => (
                <Fragment>
                  {matches.small && (
                    <p className='content3'>
                      <p className='itemContent'>
                        Faça suas conversões usando sempre as cotações mais
                        atuais publicadas diretamento pelo Banco Central
                        Europeu!
                      </p>
                    </p>
                  )}
                  {matches.medium && (
                    <p className='content2'>
                      <p className='itemContent'>
                        Faça suas conversões usando sempre as cotações mais
                        atuais publicadas diretamento pelo Banco Central
                        Europeu!
                      </p>
                    </p>
                  )}
                  {matches.large && (
                    <p className='content1'>
                      <p className='itemContent'>
                        Faça suas conversões usando sempre as cotações mais
                        atuais publicadas diretamento pelo Banco Central
                        Europeu!
                      </p>
                    </p>
                  )}
                </Fragment>
              )}
            </Media>
          </div>
        </div>
        <div className='container'>
          <p className='itemContainer'>
            Coloque um valor, selecione as moedas para qual deseja converter e
            tenha imediatamente o resultado com base nas cotações publicadas
            pelo{' '}
            {
              <a
                className='externalLink'
                href='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                Banco Central Europeu.
              </a>
            }
          </p>
          <div className='logoBank'>
            <img src={logo} className='logoBankImg' alt='europe bank'></img>
          </div>
          <p className='itemConteinerTitle'>Cuide do seu dinheiro</p>
          <div className='logoMoney'>
            <img src={logoMoney} className='logoMoneyImg' alt='money'></img>
          </div>
          <p className='itemContainer'>
            Além de saber, exatamente, o valor após a conversão em moeda
            estrangeira, o conversor vai auxiliar você para, por exemplo,
            encontrar a maneira mais barata e segura de enviar ou de receber
            dinheiro do exterior, o que, dessa forma, torna o planejamento das
            finanças mais exato.
          </p>
          <p className='itemConteinerTitle'>Viaje tranquilo</p>
          <div className='logoTravel'>
            <img
              src={logoTravel}
              className='logoTravelImgbaah'
              alt='travel'
            ></img>
          </div>
          <p className='itemContainer'>
            Fique mais tranquilo quando for fazer aquela viagem ao exterior,
            sabendo exatamente quanto dinheiro deve levar, evitando dor de
            cabeça. Sabe-se que o mercado é instável, e o valor das moedas muda
            constantemente, portanto é mais seguro converter através de valores
            atualizados diariamente.
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
