import React, { Component, Fragment } from 'react'
import './App.css'
import Conversor2 from './components/Conversor2'
import intl from 'react-intl-universal'
import Media from 'react-media'

import logo from './assets/eurocentralbanklogo.jpg'
import logoMoney from './assets/moneyuplogo.jpg'
import logoTravel from './assets/logotravel.jpg'

import euaFlag from './assets/euaFlag.jpg'
import euroFlag from './assets/euroFlag.jpg'
import brazilFlag from './assets/brazilFlag.jpg'
import ukFlag from './assets/ukFlag.jpg'

const locales = {
  'pt-BR': require('./locales/pt-BR.json'),
  'en-US': require('./locales/en-US.json')
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      quoete1: '',
      quoete2: '',
      quoete3: ''
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
    let base = ''
    let parm1 = ''
    let parm2 = ''
    let parm3 = ''
    if (navigator.language === 'pt-BR') {
      base = 'BRL'
      parm1 = 'USD'
      parm2 = 'EUR'
      parm3 = 'GBP'
    } else {
      base = 'USD'
      parm1 = 'EUR'
      parm2 = 'GBP'
      parm3 = 'BRL'
    }

    localStorage.removeItem('cot')
    let ls = localStorage.getItem('cot')
    let lsMill = parseFloat(localStorage.getItem('cotMill'))
    lsMill += 3600000
    let atualdate = new Date()

    //console.log(lsMill - atualdate.getTime())
    if (!ls || atualdate.getTime() > lsMill) {
      //console.log('buscou')
      localStorage.removeItem('cot')
      localStorage.removeItem('cotMill')
      let url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${parm1},${parm2},${parm3}`

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(json => {
          localStorage.setItem('cot', JSON.stringify(json))
          let date = new Date()
          localStorage.setItem('cotMill', date.getTime())

          //console.log(json.rates[parm1], json.rates[parm2], json)

          let cot1 = parseFloat(json.rates[parm1])
          cot1 = (1 / cot1).toFixed(3)
          let cot2 = parseFloat(json.rates[parm2])
          cot2 = (1 / cot2).toFixed(3)
          let cot3 = parseFloat(json.rates[parm3])
          cot3 = (1 / cot3).toFixed(3)

          //console.log(cot1, cot2)

          this.setState({ quoete1: cot1 })
          this.setState({ quoete2: cot2 })
          this.setState({ quoete3: cot3 })

          //console.log('buscou APP')
        })
    } else {
      //console.log('storage')
      let json = JSON.parse(ls)

      let cot1 = parseFloat(json.rates[parm1])
      cot1 = (1 / cot1).toFixed(3)
      let cot2 = parseFloat(json.rates[parm2])
      cot2 = (1 / cot2).toFixed(3)
      let cot3 = parseFloat(json.rates[parm3])
      cot3 = (1 / cot3).toFixed(3)

      this.setState({ quoete1: cot1 })
      this.setState({ quoete2: cot2 })
      this.setState({ quoete3: cot3 })
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
                  {navigator.language === 'pt-BR' ? (
                    <img
                      src={euaFlag}
                      className='countryImg'
                      alt='eua flag'
                    ></img>
                  ) : (
                    <img
                      src={euroFlag}
                      className='countryImg'
                      alt='euro flag'
                    ></img>
                  )}
                  <p className='textCurr'>{this.state.quoete1}</p>
                </div>
                <div className='divCurr'>
                  {navigator.language === 'pt-BR' ? (
                    <img
                      src={euroFlag}
                      className='countryImg'
                      alt='eua flag'
                    ></img>
                  ) : (
                    <img
                      src={ukFlag}
                      className='countryImg'
                      alt='uk flag'
                    ></img>
                  )}
                  <p className='textCurr'>{this.state.quoete2}</p>
                </div>
                <div className='divCurr'>
                  {navigator.language === 'pt-BR' ? (
                    <img
                      src={ukFlag}
                      className='countryImg'
                      alt='euro flag'
                    ></img>
                  ) : (
                    <img
                      src={brazilFlag}
                      className='countryImg'
                      alt='brazil flag'
                    ></img>
                  )}
                  <p className='textCurr'>{this.state.quoete3}</p>
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
                    <div className='content3'>
                      <p className='itemContent'>{intl.get('content.msg1')}</p>
                    </div>
                  )}
                  {matches.medium && (
                    <div className='content2'>
                      <p className='itemContent'>{intl.get('content.msg1')}</p>
                    </div>
                  )}
                  {matches.large && (
                    <div className='content1'>
                      <p className='itemContent'>{intl.get('content.msg1')}</p>
                    </div>
                  )}
                </Fragment>
              )}
            </Media>
          </div>
        </div>
        <div className='container'>
          <p className='itemContainer'>
            {intl.get('container.msg1')}{' '}
            {
              <a
                className='externalLink'
                href='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                {intl.get('container.msg2')}
              </a>
            }
          </p>
          <div className='logoBank'>
            <img src={logo} className='logoBankImg' alt='europe bank'></img>
          </div>
          <p className='itemConteinerTitle'>{intl.get('container2.msg1')}</p>
          <div className='logoMoney'>
            <img src={logoMoney} className='logoMoneyImg' alt='money'></img>
          </div>
          <p className='itemContainer'>{intl.get('container2.msg2')}</p>
          <p className='itemConteinerTitle'>{intl.get('container3.msg1')}</p>
          <div className='logoTravel'>
            <img
              src={logoTravel}
              className='logoTravelImgbaah'
              alt='travel'
            ></img>
          </div>
          <p className='itemContainer'>{intl.get('container3.msg2')}</p>
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
