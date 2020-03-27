import React, { Component } from 'react'
import './Conversor.css'

class Conversor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      moedaA_valor: '',
      moedaB_valor: 0
    }
  }

  convert = () => {
    let from_to = `${this.props.moedaA}_${this.props.moedaB}`
    let url = `https://free.currconv.com/api/v7/convert?apiKey=02a0baf4414a654a31db&q=${from_to}&compact=y`

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        let cot = json[from_to].val
        let moedaB_valor = parseFloat(
          (this.state.moedaA_valor * cot).toFixed(2)
        )
        this.setState({ moedaB_valor })
      })
  }

  render () {
    return (
      <div className='conversor'>
        <div className='title2'>
          <h2>
            {this.props.moedaA} to {this.props.moedaB}
          </h2>
        </div>
        <div className="inputs">
          <input
            className='input'
            type='text'
            value={this.moedaA_valor}
            onChange={event => {
              var val = event.target.value.replace(',', '.')
              this.setState({ moedaA_valor: val })
            }}
          ></input>
          <input
            className='btn'
            type='button'
            value='Convert'
            onClick={this.convert}
          ></input>
          <input
            className='result'
            value={this.state.moedaB_valor}
            disabled={true}
          ></input>
        </div>
      </div>
    )
  }
}

export default Conversor
