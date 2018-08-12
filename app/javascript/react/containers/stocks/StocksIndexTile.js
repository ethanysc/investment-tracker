import React from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import '!style-loader!css-loader!rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)
const wrapperStyle = { width: 400, margin: 50 }

class StocksIndexTile extends React.Component {
  constructor(props){
    super(props)
    this.state = { value: [Math.floor(this.props.low), Math.floor(this.props.high)] }
  }

  render(){
    let stock = this.props.stock
    let value = {}
    if (!this.state.value[0]){
      value = { value: [Math.floor(stock.low), Math.floor(stock.high)] }
    }
    else {
      value = this.state.value
    }

    if(this.props.errors.length > 0){
      errorMsg = <div>{this.props.errors[0]}</div>
    }
    return(
      <div className='panel callout radius'>
        <div></div>
        <div>Symbol: {stock.symbol}</div>
        <div>Company Name: {stock.companyName}</div>
        <div>Primary Exchange: {stock.primaryExchange}</div>
        <div>Sector: {stock.sector}</div>
        <div>Open: ${stock.open}</div>
        <div>Close: ${stock.close}</div>
        <div>High: ${stock.high}</div>
        <div>Low: ${stock.low}</div>
        <div>Price: ${stock.latestPrice}</div>
        <div>Volume: {stock.latestVolume}</div>
        <div>Change: {stock.change}</div>
        <div>Change %: {stock.changePercent}%</div>
        <div style={wrapperStyle}>
          <p>Set your acceptable investment range:</p>
            <Range min={Math.floor(stock.low - 10)}
                  max={Math.floor(stock.high + 10)}
                  defaultValue={[Math.floor(stock.low - 1), Math.floor(stock.high + 1)]}
                  onChange={value=>this.setState({value})}
                  tipFormatter={value => `$${value}`} />
        </div>
        <button className='btn-add'
                name={JSON.stringify({ stock: stock, range: value })}
                onClick={this.props.handleClick}>
          Add to List
        </button>
      </div>
    )
  }
}

export default StocksIndexTile
