import React, { Component, Fragment } from 'react'
import './contactus.css'
import Media from 'react-media'
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
      formName: '',
      formEmail: '',
      formPhone: '',
      formMessage: ''
    }

    const currentLocale = locales[navigator.language]
      ? navigator.language
      : 'pt-BR'

    intl.init({
      currentLocale,
      locales
    })
  }

  render () {
    return (
      <div className='aboutContainer'>
        <div className='aboutHeader'>
          <Link to='/'>
            <div className='logo'></div>
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
                value={this.state.formName}
                onChange={ev => {
                  this.setState({formName : ev.value})
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
                value={this.state.formEmail}
                onChange={ev => {
                  this.setState({formEmail : ev.value})
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
                value={this.state.formPhone}
                onChange={ev => {
                  this.setState({formPhone : ev.value})
                }}
              ></input>
            </label>
            <label className='labelInputForm'>
              <h3>{intl.get('contForm.msg4.dsc1')}</h3>
              <textarea
                className='textareaForm'
                type='text'
                inputMode='text'
                value={this.state.formMessage}
                onChange={ev => {
                  this.setState({formMessage : ev.value})
                }}
              ></textarea>
            </label>
            <label className='labelInputForm'>
              <button className='buttonForm'>
                {intl.get('contForm.msg5.dsc1')}
              </button>
            </label>
          </div>
        </div>
        <div className='footer'>
          <div className='itemFooter'>
            <div className='itemFooter2'>
              <Link to='/about'>{intl.get('footer.msg1')}</Link>
            </div>
            <div className='itemFooter2'>
              <Link to='/contactus'>{intl.get('footer.msg2')}</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
