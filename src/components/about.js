import React, { Component, Fragment } from 'react'
import './about.css'
import Media from 'react-media'
import { Link } from 'react-router-dom'
import intl from 'react-intl-universal'

import dev1 from '../assets/aboutJones.jpg'
import dev2 from '../assets/aboutAugusto.jpg'
import linkedin from '../assets/linkedin.png'

const locales = {
  'pt-BR': require('../locales/pt-BR.json'),
  'en-US': require('../locales/en-US.json')
}

export default class components extends Component {
  constructor () {
    super()
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
        <div className='header'>
          <div className='contentHeader'>
            <Link className='linkHome' to='/'>
              <div className='logo'></div>
            </Link>
            <div className='titleContact'>
              <h1>{intl.get('aboutTitle.msg2')}</h1>
            </div>
          </div>
        </div>
        <div className='aboutSite'>
          <h1 className='aboutSiteTitle'>{intl.get('aboutTitle.msg1')}</h1>
          <div className='aboutSiteContent'>
            <p>
              {intl.get('aboutDsc.msg1')}{' '}
              <a href='https://converte-moeda.com' rel='noopener noreferrer'>
                converte-moeda.com
              </a>{' '}
              {intl.get('aboutDsc.msg2')}
            </p>
          </div>
        </div>
        <div className='aboutUs'>
          <h1 className='aboutSiteTitle'>{intl.get('aboutUsTitle.msg1')}</h1>
          <div className='aboutUsContent'>
            <div className='aboutUsContentItem1Div'>
              <div className='aboutUsContentItem1'>
                <Media
                  queries={{
                    withPicture: '(min-width: 750px)'
                  }}
                >
                  {matches => (
                    <Fragment>
                      {matches.withPicture && (
                        <div className='pic1Div'>
                          <img
                            src={dev1}
                            className='pic1Img'
                            alt='developer 1'
                          ></img>
                        </div>
                      )}
                    </Fragment>
                  )}
                </Media>
                <div className='aboutUsContentItem1Text'>
                  <div className='nomeLogo'>
                    <h2 className='aboutUsContentItem1TextTitle'>Jones</h2>
                    <a
                      href='https://www.linkedin.com/in/jones-vh-3464031a6/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <img
                        alt='linkedin'
                        className='logoLinkedIn'
                        src={linkedin}
                      />
                    </a>
                  </div>
                  <p className='aboutUsContentItem1TextBody'>
                    {intl.get('aboutUsDsc1.msg1')}
                  </p>
                </div>
              </div>
            </div>
            <div className='aboutUsContentItem3Div'>
              <div className='aboutUsContentItem3'>
                <div className='aboutUsContentItem3Text'>
                  <div className='nomeLogo'>
                    <h2 className='aboutUsContentItem3TextTitle'>Augusto</h2>
                    <a
                      href='https://www.linkedin.com/in/augusto-ricardo-tischler-zvoboter-50babb127/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <img
                        alt='linkedin'
                        className='logoLinkedIn'
                        src={linkedin}
                      />
                    </a>
                  </div>
                  <p className='aboutUsContentItem3TextBody'>
                    {intl.get('aboutUsDsc2.msg1')}
                  </p>
                </div>
                <Media
                  queries={{
                    withPicture: '(min-width: 750px)'
                  }}
                >
                  {matches => (
                    <Fragment>
                      {matches.withPicture && (
                        <div className='pic2Div'>
                          <img
                            src={dev2}
                            className='pic2Img'
                            alt='developer 2'
                          ></img>
                        </div>
                      )}
                    </Fragment>
                  )}
                </Media>
              </div>
            </div>
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
