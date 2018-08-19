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
    this.onHover = this.onHover.bind(this)
    this.offHover = this.offHover.bind(this)
  }

  onHover(){
    this.setState({ hover: true })
  }

  offHover(){
    this.setState({ hover: false })
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

    let divClass = 'portfolio-index-tile large-3 columns panel callout radius'
    if (this.state.hover){
      divClass = 'hover-index-tile large-3 columns panel callout radius'
    }

    return(
      <div>
        <Link to={`/stocks/${userInfo.id}`}>
          <div className={divClass} onMouseOver={ this.onHover } onMouseOut={ this.offHover } data-equalizer-watch>
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
