import React, { Component } from 'react'
import './Conversor.css'

class Conversor extends Component {
  constructor (props) {
    super(props)

    this.state={
      moedaA_valor:'',
      moedaB_valor:0
    }
  }

  convert = () => {

    let from_to = `${this.props.moedaA}_${this.props.moedaB}`
    let url = `https://free.currconv.com/api/v7/convert?apiKey=do-not-use-this-key&q=${from_to}&compact=y`

    fetch(url)
    .then(res=>{
      return res.json()
    })
    .then(json=>{
      let cot = json[from_to].val
      let moedaB_valor = (parseFloat((this.state.moedaA_valor * cot).toFixed(2)))
      this.setState({moedaB_valor})
    })

    
  }

  render () {
    return (
      <div className="conversor">
        <h2>{this.props.moedaA} to {this.props.moedaB}</h2>
        <input
          className="input"
          type='text'
          value={this.moedaA_valor}
          onChange={(event)=>this.setState({moedaA_valor : event.target.value})}
        ></input>
        <input className="button" type="button" value="Convert" onClick={this.convert}></input>
        <h2>{this.state.moedaB_valor}</h2>
      </div>
    )
  }
}

export default Conversor
