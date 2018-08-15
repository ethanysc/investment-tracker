import React from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import '!style-loader!css-loader!rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)
const wrapperStyle = { width: 300, margin: 20 }

class NewStockFormContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      stock: this.props.stock,
      range: [this.props.stock.low, this.props.stock.high],
      share: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let formatPayload = {
      symbol: this.state.stock.symbol,
      company_name: this.state.stock.companyName,
      primary_exchange: this.state.stock.primaryExchange,
      sector: this.state.stock.sector,
      open: this.state.stock.open,
      close: this.state.stock.close,
      high: this.state.stock.high,
      low: this.state.stock.low,
      price: this.state.stock.latestPrice,
      volume: this.state.stock.latestVolume,
      change: this.state.stock.change,
      change_percent: this.state.stock.changePercent,
      low_range: this.state.range[0],
      high_range: this.state.range[1],
      share: this.state.share
    }
    this.props.handleClick(formatPayload)
  }
  render(){

    let stock = this.state.stock
    let range = this.state.range

    return(
      <form className='new-stock-form' onSubmit={this.handleSubmit}>
        <label className='new-stock-label' htmlFor='share'>Number of Shares:</label>
        <input className='new-stock-input' type='number' name='share' onChange={this.handleChange}/>
          <div>Set your acceptable investment range:</div>
            <div style={wrapperStyle}>
              <Range min={Math.floor(stock.low - 10)}
                    max={Math.floor(stock.high + 10)}
                    defaultValue={[Math.floor(stock.low - 1), Math.floor(stock.high + 1)]}
                    allowCross={false}
                    onChange={value => this.setState({ range: [value[0], value[1]] })}
                    tipFormatter={value => `$${value}`}
                    name='range'
                    className='add-slider' />
              </div>
        <button type='submit' className='button radius'>Add to List</button>
      </form>
    )
  }
}

export default NewStockFormContainer
