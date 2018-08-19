import React from 'react'
import { Link } from 'react-router'

class PortfolioIndexTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stock: this.props.stock,
      userInfo: this.props.userInfo,
      hover: false
    }
  }

  render(){
    let stock, userInfo = ''
    if (this.state.userInfo){
      stock = this.state.stock
      userInfo = this.state.userInfo
    }
    let trendIcon = ''
    if (stock.change > 0){
      trendIcon = <i className="fas fa-arrow-alt-circle-up"></i>
    }
    else if (stock.change < 0) {
      trendIcon = <i className="fas fa-arrow-alt-circle-down"></i>
    }
    else {
      trendIcon = ''
    }

    return(
      <div>
        <Link to={`/stocks/${userInfo.id}`} className='portfolio-index-tile small-6 medium-4 large-3 columns end panel callout radius'>
          <div data-equalizer-watch>
            <div>{stock.companyName}</div>
            <div>{stock.symbol}</div>
            <div>{stock.sector}</div>
            <div>${parseFloat(stock.latestPrice).toFixed(2)}  |  {trendIcon} ${parseFloat(stock.change).toFixed(2)}</div>
            <div>Shares: {userInfo.share}</div>
          </div>
        </Link>
      </div>

    )
  }
}

export default PortfolioIndexTile
