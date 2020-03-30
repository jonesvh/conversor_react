import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

function Dois () {
  useEffect(() => {
    ReactGA.initialize('UA-162192560-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])
  return <div>oi</div>
}
export default Dois
