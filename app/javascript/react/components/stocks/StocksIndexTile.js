import React from 'react'

import NewStockFormContainer from '../../containers/stocks/NewStockFormContainer'

const StocksIndexTile = props => {
  let stock = props.stock

  let errorMsg = ''
  if(props.errors.length > 0){
    errorMsg = <div>{props.errors[0]}</div>
  }
  return(
    <div className='panel callout radius'>
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
      <NewStockFormContainer
        stock={stock}
        handleClick={props.handleClick}
      />
      <div>{errorMsg}</div>
    </div>
  )
}

export default StocksIndexTile
