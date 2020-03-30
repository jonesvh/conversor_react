import React, {useEffect} from 'react'
import ReactGA from 'react-ga'

function initGA () {
  ReactGA.initialize('UA-162192560-1')
  ReactGA.pageview('/dois')
}
function Dois () {
    useEffect(() => {initGA()}, [])
    return <div>oi</div>
}
export default Dois
