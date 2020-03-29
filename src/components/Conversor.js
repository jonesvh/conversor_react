import React, { Component } from 'react'
import './Conversor.css'
import intl from 'react-intl-universal';

const locales = {
  'pt-BR': require('../locales/pt-BR.json'),
  'en-US': require('../locales/en-US.json')
}

class Conversor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      moedaA_valor: '1,00', //para calcular
      moedaB_valor: 0
    }

    const currentLocale = locales[navigator.language]
      ? navigator.language
      : 'pt-BR'

    intl.init({
      currentLocale,
      locales
    })
  }

  componentDidMount = () =>{
    this.convert()
  }

  convert = () => {
    
    let typedVal = this.state.moedaA_valor

    let valNumber = typedVal.toString().replace(',', '')
    valNumber = valNumber.replace('.', '')
    //typedVal = typedVal.replace(',', '.')
    //typedVal *= 10
    //typedVal = typedVal.toString().replace('.', ',')

    //console.log(this.state.moedaA_valor, typedVal)

    let from_to = `${this.props.moedaA}_${this.props.moedaB}`
    let url = `https://free.currconv.com/api/v7/convert?apiKey=02a0baf4414a654a31db&q=${from_to}&compact=y`

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        //console.log(json)
        let cot = json[from_to].val
        let moedaB_valor = parseFloat(valNumber * cot)
        this.setState({ moedaB_valor })
      })
  }

  maskValue = i => {
    var v = i.replace(/\D/g, '')
    v = (v / 100).toFixed(2) + ''
    v = v.replace('.', ',')
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,')
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,')
    return v
  }

  getVal = () => {
    let valStr = this.maskValue(this.state.moedaA_valor)
    return valStr
  }

  setRes = () => {
    let val = this.maskValue(this.state.moedaB_valor)
    //let val = this.state.moedaB_valorStr
    return val.toFixed(2)
  }

  render () {
    return (
      <div className='conversor'>
        <div className='title2'>
          <h2>
            {this.props.moedaA} -> {this.props.moedaB}
          </h2>
        </div>
        <div className='inputs'>
          <input
            className='input'
            type='text'
            value={this.getVal()}
            //value={this.state.moedaA_valor}
            onChange={event => {
              event.persist()
              let ev = event
              var val = ev.target.value
              this.setState({ moedaA_valor: val })
            }}
          ></input>
          <input
            className='btn'
            type='button'
            value={intl.get("btn.convert")}
            onClick={this.convert}
          ></input>
          <input
            className='result'
            //value={this.setRes()}
            value={this.state.moedaB_valor.toFixed(2)}
            disabled={true}
          ></input>
        </div>
      </div>
    )
  }
}

export default Conversor
