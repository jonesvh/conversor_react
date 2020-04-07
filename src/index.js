import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AboutUs from './components/about'
import ContactUs from './components/contactus'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import intl from 'react-intl-universal'
const locales = {
  'pt-BR': require('./locales/pt-BR.json'),
  'en-US': require('./locales/en-US.json')
}
const currentLocale = locales[navigator.language] ? navigator.language : 'pt-BR'

intl.init({
  currentLocale,
  locales
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={App} />
        <Route path='/about' component={AboutUs} />
        <Route path='/contactus' component={ContactUs} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
document.getElementById('titleTag').innerHTML = intl.get('titleTag.msg1')
document.getElementById('metaDsc').content = intl.get('metaTagDsc.msg1')
document.getElementById('metaTagKeys').content = intl.get('metaTagKeys.msg1')
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister()
serviceWorker.register()
