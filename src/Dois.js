import React, { Component } from 'react'
import ReactGA from 'react-ga'

function initGA () {
  ReactGA.initialize('UA-162192560-1')
  ReactGA.pageview(window.location.pathname + window.location.search)
}
class Dois extends Component {
  componentDidMount () {
    initGA()
  }

  render () {
    return <div>oi</div>
  }
}
export default Dois
