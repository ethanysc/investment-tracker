import React from 'react'

import NewStockFormContainer from '../../containers/stocks/NewStockFormContainer'

const StocksIndexTile = props => {
  let stock = props.stock

  let errorMsg = ''
  if(props.errors.length > 0){
    errorMsg = <div>{props.errors[0]}</div>
  }
  return(
    <div className=' stock-index-tile large-3 columns panel callout radius'>
      <div>{stock.companyName}</div>
      <div>{stock.symbol}</div>
      <div>{stock.sector}</div>
      <div>High: ${stock.high}</div>
      <div>Low: ${stock.low}</div>
      <div>Price: ${stock.latestPrice}</div>
      <div>Volume: {stock.latestVolume}</div>
      <div>Change: ${stock.change}</div>
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
