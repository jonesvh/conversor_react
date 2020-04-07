import React, { Component } from 'react'
import './contactus.css'
import { Link } from 'react-router-dom'
import intl from 'react-intl-universal'

const locales = {
  'pt-BR': require('../locales/pt-BR.json'),
  'en-US': require('../locales/en-US.json')
}

export default class components extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      response: ''
    }

    const currentLocale = locales[navigator.language]
      ? navigator.language
      : 'pt-BR'

    intl.init({
      currentLocale,
      locales
    })
  }

  validateMail = () => {
    this.setState({ response: '' })

    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.message === ''
    ) {
      this.setState({ response: intl.get('formRes.msg3') })
    } else {
      this.sendMail()
    }
  }

  sendMail = async () => {
    let json = this.state
    let url = 'https://currconverter-api.herokuapp.com/sendmail'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    console.log(res.status)
    if (res.status) {
      let resp = res.status.toString()
      if (resp === '200') {
        this.setState({name: '', email: '', phone: '', message: ''})
      }
      this.setState({ response: resp })
    } else {
      this.setState({ response: '500' })
    }
  }

  render () {
    return (
      <div className='aboutContainer'>
        <div className='aboutHeader'>
          <Link className='linkHome' to='/'>
            <div className='logoHome'></div>
            {intl.get('header.msg1')}
          </Link>
        </div>
        <div className='contContainer'>
          <div className='contContainerBody'>
            <h1>{intl.get('contTitle.msg1')}</h1>
            <p className='contBodyText'>{intl.get('contTitle.msg2')}</p>
          </div>
          <div className='contForm'>
            <label className='labelInputForm'>
              <h3>{intl.get('contForm.msg1.dsc1')}</h3>
              <input
                placeholder={intl.get('contForm.msg1.dsc2')}
                className='inputForm'
                type='text'
                inputMode='text'
                value={this.state.name}
                onChange={ev => {
                  this.setState({ name: ev.target.value })
                }}
              ></input>
            </label>
            <label className='labelInputForm'>
              <h3>{intl.get('contForm.msg2.dsc1')}</h3>
              <input
                placeholder={intl.get('contForm.msg2.dsc2')}
                className='inputForm'
                type='email'
                inputMode='email'
                value={this.state.email}
                onChange={ev => {
                  this.setState({ email: ev.target.value })
                }}
              ></input>
            </label>
            <label className='labelInputForm'>
              <h3>{intl.get('contForm.msg3.dsc1')}</h3>
              <input
                placeholder={intl.get('contForm.msg3.dsc2')}
                className='inputForm'
                type='text'
                inputMode='tel'
                value={this.state.phone}
                onChange={ev => {
                  this.setState({ phone: ev.target.value })
                }}
              ></input>
            </label>
            <label className='labelInputForm'>
              <h3>{intl.get('contForm.msg4.dsc1')}</h3>
              <textarea
                className='textareaForm'
                type='text'
                inputMode='text'
                value={this.state.message}
                onChange={ev => {
                  this.setState({ message: ev.target.value })
                }}
              ></textarea>
            </label>
            <label className='labelInputForm'>
              <button className='buttonForm' onClick={this.validateMail}>
                {intl.get('contForm.msg5.dsc1')}
              </button>
            </label>
            {this.state.response === '200' || this.state.response === '500' ? (
              <div>
                {this.state.response === '200' ? (
                  <h3>{intl.get('formRes.msg1')}</h3>
                ) : (
                  <h3>{intl.get('formRes.msg2')}</h3>
                )}
              </div>
            ) : (
              <div>
                <h3>{this.state.response}</h3>
              </div>
            )}
          </div>
        </div>
        <div className='footer'>
          <div className='itemFooter'>
            <div className='itemFooter2'>
              <Link className='linkFooter' to='/about'>
                {intl.get('footer.msg1')}
              </Link>
            </div>
            <div className='itemFooter2'>
              <Link className='linkFooter' to='/contactus'>
                {intl.get('footer.msg2')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
