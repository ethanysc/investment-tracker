import React from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import '!style-loader!css-loader!rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)
const wrapperStyle = { width: 400, margin: 50 }

const StocksIndexTile = (props) => {
  return(
    <div className='panel callout radius'>
      <div>Symbol: {props.stock.symbol}</div>
      <div>Company Name: {props.stock.companyName}</div>
      <div>Primary Exchange: {props.stock.primaryExchange}</div>
      <div>Sector: {props.stock.sector}</div>
      <div>Open: ${props.stock.open}</div>
      <div>Close: ${props.stock.close}</div>
      <div>High: ${props.stock.high}</div>
      <div>Low: ${props.stock.low}</div>
      <div>Price: ${props.stock.latestPrice}</div>
      <div>Volume: {props.stock.latestVolume}</div>
      <div>Change: {props.stock.change}</div>
      <div>Change %: {props.stock.changePercent}%</div>
      <div style={wrapperStyle}>
      <p>Set your acceptable investment range:</p>
        <Range min={props.stock.low - 10} max={props.stock.high + 10} defaultValue={[props.stock.low - 1, props.stock.high + 1]} tipFormatter={value => `$${value}`} />
      </div>
      <button className='btn-add' name={JSON.stringify(props.stock)} onClick={props.handleClick}>Add to List</button>
    </div>
  )
}

export default StocksIndexTile
