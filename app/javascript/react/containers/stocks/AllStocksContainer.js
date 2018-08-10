import React from 'react'
import { browserHistory } from 'react-router'

import StocksIndexTile from '../../components/stocks/StocksIndexTile'

class AllStocksContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: [],
      newStock: null
    }
    this.fetchSectorStocks = this.fetchSectorStocks.bind(this)
    this.postStock = this.postStock.bind(this)
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

  fetchSectorStocks(sectorName){
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

  postStock(payload){
    let jsonPayload = JSON.parse(payload)
    let formatPayload = {
      symbol: jsonPayload.symbol,
      company_name: jsonPayload.companyName,
      primary_exchange: jsonPayload.primaryExchange,
      sector: jsonPayload.sector,
      open: jsonPayload.open,
      close: jsonPayload.close,
      high: jsonPayload.high,
      low: jsonPayload.low,
      price: jsonPayload.latestPrice,
      change: jsonPayload.change,
      change_percent: jsonPayload.changePercent
    }
    fetch(`/api/v1/stocks.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(formatPayload)
    })
      .then(response => {
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => {
        debugger
        browserHistory.push(`/stocks/${body.newStock.id}`)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let handleAdd = (event) => {
      this.postStock(event.target.name)
    }
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
            handleClick={handleAdd}
          />
        )
      })
    }

    let handleCategories = (event) => {
      event.preventDefault()
      this.fetchSectorStocks(event.target.name)
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

export default AllStocksContainer
