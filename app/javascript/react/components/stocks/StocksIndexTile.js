import React from 'react'

import NewStockFormContainer from '../../containers/stocks/NewStockFormContainer'

const StocksIndexTile = props => {
  let stock = props.stock

  let errorMsg = ''
  if(props.errors.length > 0){
    errorMsg = <div>{props.errors[0]}</div>
  }
  return(
    <div className='stock-index-tile large-3 columns panel callout radius' data-equalizer >
      <div className='stock-index-symbol'>{stock.symbol}</div>
      <div>{stock.companyName}</div>
      <div>{stock.sector}</div>
      <div>High: ${parseFloat(stock.high).toFixed(2)}</div>
      <div>Low: ${parseFloat(stock.low).toFixed(2)}</div>
      <div>Price: ${parseFloat(stock.latestPrice).toFixed(2)}</div>
      <div>Volume: {stock.latestVolume}</div>
      <div>Change: ${parseFloat(stock.change).toFixed(2)}</div>
      <div>Change %: {stock.changePercent.toPrecision(2)}%</div>
      <NewStockFormContainer
        stock={stock}
        handleClick={props.handleClick}
      />
      <div>{errorMsg}</div>
    </div>
  )
}

export default StocksIndexTile
