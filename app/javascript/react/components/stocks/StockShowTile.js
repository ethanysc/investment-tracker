import React from 'react'

const StockShowTile = (props) => {
  return(
    <div>
      <div className='panel callout radius'>
        <h1>Stock Info</h1>
        <div>Symbol: {props.stock.symbol}</div>
        <div>Company Name: {props.stock.companyName}</div>
        <div>Primary Exchange: {props.stock.primaryExchange}</div>
        <div>Sector: {props.stock.sector}</div>
        <div>Open: ${props.stock.open}</div>
        <div>Close: ${props.stock.close}</div>
        <div>High: ${props.stock.high}</div>
        <div>Low: ${props.stock.low}</div>
        <div>Latest Price: ${props.stock.latestPrice}</div>
        <div>Latest Volume: {props.stock.latestVolume}</div>
        <div>Change: {props.stock.change}</div>
        <div>Change %: {props.stock.changePercent}%</div>
      </div>
      <div className='panel callout radius'>
        <h1>Investment Info</h1>
        <div>Bought Price: ${props.userInfo.price}</div>
        <div>Share: {props.userInfo.share}</div>
        <div>Set High Range: ${props.userInfo.highRange}</div>
        <div>Set Low Range: ${props.userInfo.lowRange}</div>
      </div>
    </div>
  )
}

export default StockShowTile
