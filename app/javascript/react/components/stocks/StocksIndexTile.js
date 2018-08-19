import React from 'react'

import NewStockFormContainer from '../../containers/stocks/NewStockFormContainer'

const StocksIndexTile = props => {
  let stock = props.stock

  let errorMsg = ''
  if(props.errors.length > 0){
    errorMsg = <div>{props.errors[0]}</div>
  }

  let statsColor = (stats) => {
    if (stats > 0){
      return 'green'
    }
    else if (stats < 0){
      return 'red'
    }
  }

  let companyName = stock.companyName
  if (companyName.length > 30){
    companyName = companyName.slice(0, 30) + '...'
  }

  return(
    <div className='stock-index-tile small-6 medium-4 large-3 columns end panel callout radius' data-equalizer >
      <div className='stock-index-symbol'>{stock.symbol}</div>
      <div>{companyName}</div>
      <div>{stock.sector}</div>
      <div>High: ${parseFloat(stock.high).toFixed(2)}</div>
      <div>Low: ${parseFloat(stock.low).toFixed(2)}</div>
      <div><span className={statsColor(stock.latestPrice)}>Price: ${parseFloat(stock.latestPrice).toFixed(2)}</span></div>
      <div>Volume: {stock.latestVolume}</div>
      <div><span className={statsColor(stock.change)}>Change: ${parseFloat(stock.change).toFixed(2)}</span></div>
      <div><span className={statsColor(stock.changePercent)}>Change %: {stock.changePercent.toPrecision(2)}%</span></div>
      <NewStockFormContainer
        stock={stock}
        handleClick={props.handleClick}
      />
      <div>{errorMsg}</div>
    </div>
  )
}

export default StocksIndexTile
