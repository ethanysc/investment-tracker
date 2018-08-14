import React from 'react'
import { Link } from 'react-router'

const PortfolioIndexTile = (props) => {
  let stock, userInfo = ''
  if (props.stock){
    stock = props.stock
    userInfo = props.userInfo
  }
  return(
    <div className='portfolio-index-tile large-3 columns panel callout radius data-equalizer-watch'>
      <div>Symbol: <Link to={`/stocks/${userInfo.id}`}>{stock.symbol}</Link></div>
      <div>Company Name: {stock.companyName}</div>
      <div>Primary Exchange: {stock.primaryExchange}</div>
      <div>Sector: {stock.sector}</div>
      <div>Price: ${stock.price}</div>
      <div>Volume: {stock.volume}</div>
      <div>Change: ${stock.change}</div>
      <div>Price Bought: ${userInfo.price}</div>
      <div>Share: {userInfo.share}</div>
    </div>
  )
}

export default PortfolioIndexTile
