import React from 'react'

import StocksIndexTile from '../../components/stocks/StocksIndexTile'

class StocksIndexContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: []
    }
    this.fetchStocks = this.fetchStocks.bind(this)
  }

  componentDidMount(){
    fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Financials`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        stocks: this.state.stocks.concat(body)
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  fetchStocks(sectorName){
    fetch(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=${sectorName}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        stocks: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let stocksList = ''
    if (this.state.stocks.length > 0){
      this.state.stocks.sort(function(a, b){
        return b.latestVolume - a.latestVolume
      })
      stocksList = this.state.stocks.slice(0, 19).map((stock) => {
        return(
          <StocksIndexTile
            key={stock.symbol}
            stock={stock}
          />
        )
      })
    }

    let handleCategories = (event) => {
      event.preventDefault()
      this.fetchStocks(event.target.name)
    }

    return(
      <div className='stock-index wrapper'>
        <h1 className='stock-index header'>List of Stocks</h1>
          <button className="btn-edge" onClick={handleCategories} name='Financials'>Financials</button>
          <button className="btn-middle" onClick={handleCategories} name='Technology'>Technology</button>
          <button className="btn-middle" onClick={handleCategories} name='Health%20Care'>Healthcare</button>
          <button className="btn-middle" onClick={handleCategories} name='Communication%20Services'>Communication Services</button>
          <button className="btn-middle" onClick={handleCategories} name='Consumer%20Discretionary'>Consumer Discretionary</button>
          <button className="btn-middle" onClick={handleCategories} name='Consumer%20Staples'>Consumer Staples</button>
          <button className="btn-edge" onClick={handleCategories} name='Energy'>Energy</button>
        <div className="">
          <ul>{stocksList}</ul>
        </div>
      </div>
    )
  }
}

export default StocksIndexContainer
