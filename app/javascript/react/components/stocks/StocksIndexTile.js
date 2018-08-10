import React from 'react'

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
      <button className='btn-add' name={JSON.stringify(props.stock)} onClick={props.handleClick}>Add to List</button>
    </div>
  )
}

export default StocksIndexTile