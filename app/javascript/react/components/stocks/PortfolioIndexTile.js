import React from 'react'
import { Link } from 'react-router'

const PortfolioIndexTile = (props) => {
  let stock, userInfo = ''
  if (props.stock){
    stock = props.stock
    userInfo = props.userInfo
  }
  let trendIcon = ''
  if (stock.change > 0){
    trendIcon = <i className="fas fa-arrow-alt-circle-up"></i>
  }else {
    trendIcon = <i className="fas fa-arrow-alt-circle-down"></i>
  }
  return(
    <Link to={`/stocks/${userInfo.id}`}>
      <div className='portfolio-index-tile large-3 columns panel callout radius data-equalizer-watch'>
        <div>{stock.companyName}</div>
        <div>{stock.symbol}</div>
        <div>{stock.sector}</div>
        <div>${stock.latestPrice}  |  {trendIcon} ${stock.change}</div>
        <div>Shares: {userInfo.share}</div>
      </div>
    </Link>
  )
}

export default PortfolioIndexTile
